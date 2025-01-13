import React, { useContext, useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { incomeColumns } from "../utils/tableColumns";
import api from "../service/api.service";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toast";
import EditModal from "../components/EditModal";
import { createIncomeSchema } from "../utils/validationSchemas";
import DynamicForm from "../components/DynamicForm";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { calculateIncomeShares, handleNumberChange } from "../utils/helper";
import ConfirmModal from "../components/ConfirmModal";
import DummyTable from "../components/DummyTable";

export default function AllIncome() {
  const { role, data } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [formType, setFormType] = useState("add");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const openModalHandler = () => {
    setFormType("add");
    setInitialData({});
    setIsModalOpen(true);
  };

  const handleEditIncome = (income) => {
    console.log(income);
    setInitialData(income);
    setIsModalOpen(true);
  };

  const [onConfirm, setOnConfirm] = useState(null);
  const handleDeleteIncome = (income) => {
    const confirmDelete = async () => {
      try {
        const response = await api.get(`/income/delete/${income._id}`);
        if (response.status === 200 && response.data.success === true) {
          toast.success(response.data.msg || "Income deleted successfully!");
          getIncomes();
        } else {
          toast.error(response.data.error || "Failed to delete income.");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Something went wrong during deletion!"
        );
      } finally {
        closeConfirmModal();
      }
    };

    setOnConfirm(() => confirmDelete);
    openConfirmModal();
  };

  const closeModalHandler = () => {
    setInitialData({});
    setIsModalOpen(false);
  };

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    console.log(values);
    if (formType == "add") {
      console.log(data);
      const incomeData = {
        userId: data._id,
        amount: values.amount,
        year: values.year,
        month: values.month,
        comments: values.comments,
      };
      const response = await api.post("/income", incomeData);
      if (response.status == 200 && response.data.success == true) {
        const result = response.data;
        actions.resetForm();
        toast.success(result.msg || "Income Added!");
        setFormType("add");
        closeModalHandler();
        getIncomes();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.response.data.error || "Something went wrong!");
      }
    } else {
      setIsLoading(false);
      const incomeData = {
        id: values._id,
        amount: values.amount,
        year: values.year,
        month: values.month,
        comments: values.comments,
      };

      const response = await api.post(
        "/income/update/" + values._id,
        incomeData
      );
      if (response.status == 200 && response.data.success == true) {
        const result = response.data;
        actions.resetForm();
        toast.success(result.msg || "Income Updated!");
        setFormType("add");
        closeModalHandler();
        getIncomes();
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response.response.data.error || "Something went wrong!");
      }
    }

    // setIsLoading(true);
    // try {
    //   const incomeData = {
    //     userId: data._id,
    //     amount: values.amount,
    //     year: values.year,
    //     month: values.month,
    //     comments: values.comments,
    //   };
    //   const response = await api.post("/income", incomeData);
    //   if (response.status === 200 && response.data.success === true) {
    //     toast.success("Income added successfully!");
    //     setIsLoading(false);
    //     actions.resetForm();
    //   } else {
    //     toast.error(response.data.error || "Failed to add income.");
    //     setIsLoading(false);
    //   }
    //   setIsModalOpen(false);
    // } catch (error) {
    //   setIsLoading(false);
    //   toast.error(error.response?.data?.error || "Something went wrong!");
    // }
  };

  const [incomeFormConfig, setIncomeFormConfig] = useState([
    {
      name: "_id",
      label: "ID",
      type: "text",
      placeholder: "ID",
      hidden: true,
      disabled: true,
    },
    {
      name: "amount",
      label: "Amount",
      type: "text",
      placeholder: "Enter amount",
      hidden: false,
      disabled: false,
      onChange: handleNumberChange,
    },
    {
      name: "year",
      label: "Year",
      type: "select",
      options: years.map((year) => ({ value: year, label: year })),
      hidden: false,
      disabled: false,
    },
    {
      name: "month",
      label: "Month",
      type: "select",
      options: [
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
      ],
      hidden: false,
      disabled: false,
    },
    {
      name: "comments",
      label: "Comments",
      type: "text",
      placeholder: "Add any comments",
    },
  ]);

  const getIncomes = async () => {
    setIsLoading(true);
    if (role == "user") {
      const response = await api.get("/income/user/" + data._id);
      if (response.status == 200 && response.data.success == true) {
        const result = response.data.data;
        if (result && result.length) {
          const userName = response.data.user.name;
          const branchName = response.data.user.branch.name;
          result.forEach((monthlyRecord) => {
            const { year, month } = monthlyRecord._id;
            monthlyRecord.records.forEach((record) => {
              const incomeshares = calculateIncomeShares(record.amount);
              record.quarter = incomeshares.quarter;
              record.tenth = incomeshares.tenth;
              record.twentieth = incomeshares.twentieth;
              record.userName = userName;
              record.branchName = branchName;
              record.year = year;
              record.month = month;
            });
          });
          const recordsOnly = result.map((entry) => entry.records).flat();
          setIncomeData(recordsOnly);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        toast.error(response.response.data.error || "Something went wrong!");
      }
    } else if (role == "admin") {
      const response = await api.get("/income/branch/" + data.branch._id);
      if (response.status == 200 && response.data.success == true) {
        const result = response.data;
        if (result.monthlyRecords && result.monthlyRecords.length) {
          result.monthlyRecords.forEach((record) => {
            record.records.forEach((subRecord) => {
              const incomeshares = calculateIncomeShares(subRecord.amount);
              subRecord.quarter = incomeshares.quarter;
              subRecord.tenth = incomeshares.tenth;
              subRecord.twentieth = incomeshares.twentieth;
              subRecord.branchName = result.branchName;
            });
          });
          const recordsOnly = result.monthlyRecords
            .map((entry) => entry.records)
            .flat();
          setIncomeData(recordsOnly);
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
        toast.error(response.response.data.error || "Something went wrong!");
      }
    } else {
      const response = await api.get("/income");
      if (response.status == 200 && response.data.success == true) {
        const result = response.data.data;
        result.map((item) => {
          const incomeshares = calculateIncomeShares(item.amount);
          item.quarter = incomeshares.quarter;
          item.tenth = incomeshares.tenth;
          item.twentieth = incomeshares.twentieth;
        });
        setIncomeData(result);
        setIsLoading(false)
      } else {
        setIsLoading(false)
        toast.error(response.response.data.error || "Something went wrong!");
      }
    }
  };
  // const test = async () => {
  //   await api.get("/income/user/" + data._id);
  //   await api.get("/income/user/" + data._id + "?year=2024");
  //   await api.get("/income/branch/" + data.branch._id);
  //   await api.get("/income");
  // };

  useEffect(() => {
    getIncomes();
    // test();
  }, []);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  return (
    <div className="p-4">
      <div className="flex w-full flex-col sm:flex-row justify-between">
        <h2 className="text-xl font-bold mb-4">Income</h2>
        {role == "user" && (
          <div className="">
            <button
              type="button"
              onClick={openModalHandler}
              className="w-full rounded-lg flex gap-2 justify-center items-center bg-blue-500 py-1.5 px-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
            >
              <UserPlusIcon className="h-5" />
              Add Income
            </button>
          </div>
        )}
      </div>
      {isLoading ? (
        <DummyTable />
      ) : (
        <TableComponent
          data={incomeData}
          columns={incomeColumns(
            setFormType,
            handleEditIncome,
            handleDeleteIncome
          )}
          csvFileName={"Income"}
        />
      )}
      <EditModal
        title={formType === "add" ? "Add Income" : "Edit Income"}
        isOpen={isModalOpen}
        closeModalHandler={() => setIsModalOpen(false)}
      >
        <DynamicForm
          formConfig={incomeFormConfig}
          validationSchema={createIncomeSchema}
          onSubmit={handleSubmit}
          initialData={initialData}
          submitButtonText={
            formType === "add" ? "Create Income" : "Update Income"
          }
        />
      </EditModal>
      <ConfirmModal
        title={"Are you sure you want to disable this income?"}
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={closeConfirmModal}
        onConfirm={onConfirm}
      />
    </div>
  );
}
