import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../service/api.service";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toast";
import DummyDashboard from "../components/DummyDashboard";
import { PieChart, Pie, Tooltip } from "recharts";
import { convertToPieUserData } from "../utils/helper";
import PopupModal from "../components/PopupModal";

const userDashboard = () => {
  const { data } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [dashboardData, setDashboardData] = useState();

  const fetchDashboardData = async () => {
    setIsLoading(true);
    const response = await api.post("/getDashboardData", data);
    if (response.status == 200 && response.data.success == true) {
      setIsLoading(false);
      const result = response.data;
      setDashboardData(result.data);
    } else {
      setIsLoading(false);
      toast.error(response.response.data.error || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [data]);

  const [pieData, setPieData] = useState([]);

  const getIncomes = async () => {
    const response = await api.get("/income/user/" + data._id);
    if (response.status == 200 && response.data.success == true) {
      const result = response.data.data;
      if (result && result.length) {
        console.log(result);
        setPieData(convertToPieUserData(result));
      }
    } else {
      toast.error(response.response.data.error || "Something went wrong!");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const checkIncome = async () => {
    const response = await api.get("/checkIncome/" + data._id);
    if (response.status == 200 && response.data.success == true) {
      const result = response.data;
      console.log(result);
      if (!result.incomeExists) {
        openModal();
      }
    } else {
      toast.error(response.response.data.error || "Something went wrong!");
    }
  };

  useEffect(() => {
    getIncomes();
    checkIncome();
  }, []);

  return isLoading ? (
    <DummyDashboard />
  ) : (
    <div className="min-h-screen">
      <PopupModal isOpen={isModalOpen} closeModal={closeModal}>
        <p>Please insert this month income!</p>
      </PopupModal>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default userDashboard;
