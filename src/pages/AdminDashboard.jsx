import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../service/api.service";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toast";
import DummyDashboard from "../components/DummyDashboard";

const AdminDashboard = () => {
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

  const [missingIncomeData, setMissingIncomeData] = useState([]);
  const missingIncome = async () => {
    setIsLoading(true);
    const response = await api.post("/missingIncome", {
      branchId: data.branch._id,
    });
    if (response.status == 200 && response.data.success == true) {
      setIsLoading(false);
      const result = response.data;
      setMissingIncomeData(result.data);
    } else {
      setIsLoading(false);
      toast.error(response.response.data.error || "Something went wrong!");
    }
  };

  const month = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  useEffect(() => {
    fetchDashboardData();
    missingIncome();
  }, [data]);
  return isLoading ? (
    <DummyDashboard />
  ) : (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        {dashboardData && (
          <>
            <Card
              heading={dashboardData.totalUsers}
              description={dashboardData.branchInfo.name}
              footer={"Total users of branch"}
            />
            <Card
              heading={missingIncomeData.summary.missingSelectedMonthCount}
              description={`${missingIncomeData.filter.year} - ${
                month.find(
                  (item) => item.value === missingIncomeData.filter.month
                )?.label || "N/A"
              }`}
              footer={"Pending incomes"}
              navigateToPage={() =>
                navigateToPage(data.role, navigate, "all-branch")
              }
            />
            <Card
              heading={missingIncomeData.summary.neverSubmittedCount}
              description={`${missingIncomeData.filter.year} - ${
                month.find(
                  (item) => item.value === missingIncomeData.filter.month
                )?.label || "N/A"
              }`}
              footer={"Never Submited incomes"}
              navigateToPage={() =>
                navigateToPage(data.role, navigate, "all-branch")
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
