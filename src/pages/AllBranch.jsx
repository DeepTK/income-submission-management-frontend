import React, { useContext, useEffect, useState } from "react";
import TableComponent from "../components/Table";
import {
  userColumns,
  productColumns,
  branchColumns,
} from "../utils/tableColumns";
import api from "../service/api.service";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toast";
import EditModal from "../components/EditModal";
import {
  createBranchSchema,
  createUserSchema,
  updateBranchSchema,
  updateUserSchema,
} from "../utils/validationSchemas";
import DynamicForm from "../components/DynamicForm";
import ConfirmModal from "../components/ConfirmModal";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import DummyTable from "../components/DummyTable";

export default function AllBranch() {
  const { role, data } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [initialData, setInitialData] = useState({});
  const [formType, setFormType] = useState("add");

  const [allBranchData, setAllBranchData] = useState([]);

  const getBranches = async () => {
    setIsLoading(true);
    if (role == "superadmin") {
      const response = await api.get("/branch/all");
      if (response.status == 200 && response.data.success == true) {
        setIsLoading(false);
        const result = response.data.data;
        setAllBranchData(result);
      } else {
        setIsLoading(false);
        toast.error(response.response.data.error || "Something went wrong!");
      }
    } else if (role == "admin") {
      const response = await api.get(
        `/branch/getBranchAndManagerByUserId/${data._id}`
      );
      if (response.status == 200 && response.data.success == true) {
        setIsLoading(false);
        const result = response.data.data;
        setAllBranchData([result]);
      } else {
        setIsLoading(false);
        toast.error(response.response.data.error || "Something went wrong!");
      }
    } else {
      const response = await api.get(
        `/branch/getBranchAndManagerByUserId/${data._id}`
      );
      if (response.status == 200 && response.data.success == true) {
        setIsLoading(false);
        const result = response.data.data;
        setAllBranchData([result]);
      } else {
        setIsLoading(false);
        toast.error(response.response.data.error || "Something went wrong!");
      }
    }
  };

  useEffect(() => {
    getBranches();
  }, []);

  const handleEditBranch = (branch) => {
    setInitialData(branch);
    setIsModalOpen(true);
  };

  const [onConfirm, setOnConfirm] = useState(null);
  const handleDeleteBranch = (branch) => {
    setIsLoading(true);
    const confirmDelete = async () => {
      try {
        const response = await api.get(`/branch/delete/${branch._id}`);
        if (response.status === 200 && response.data.success === true) {
          toast.success(response.data.msg || "Branch deleted successfully!");
          getBranches();
        } else {
          setIsLoading(false);
          toast.error(response.data.error || "Failed to delete branch.");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(
          error.response?.data?.error || "Something went wrong during deletion!"
        );
      } finally {
        setIsLoading(false);
        getBranches();
        closeConfirmModal();
      }
    };
    setOnConfirm(() => confirmDelete);
    openConfirmModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModalHandler = () => {
    setInitialData({});
    setIsModalOpen(false);
  };

  const [branchFormConfig, setBranchFormConfig] = useState([
    {
      name: "_id",
      label: "ID",
      type: "text",
      placeholder: "Branch Id",
      hidden: true,
      disabled: true,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter branch Name",
      hidden: false,
      disabled: false,
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      placeholder: "Enter branch code",
      hidden: false,
      disabled: false,
    },
    {
      name: "isActive",
      type: "toggle",
      label: "Status",
      disabled: false,
      hidden: false,
    },
  ]);

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    if (formType == "add") {
      const newBranchData = {
        name: values.name,
        code: values.code,
        isActive: values.isActive ?? true,
      };
      const response = await api.post(`/branch`, {
        ...newBranchData,
      });
      if (response.status == 200 && response.data.success == true) {
        console.log(response);
        actions.resetForm();
        toast.success(result.msg || "Branch Added!");
        closeModalHandler();
        getBranches();
        window.location.reload();
      } else {
        setIsLoading(false);
        toast.error(response.response.data.error || "Something went wrong!");
      }
    } else {
      const updatedBranchData = {
        name: values.name,
        code: values.code,
        isActive:
          values.isActive == undefined || values.isActive == null
            ? true
            : values.isActive,
      };
      const response = await api.post(`/branch/update/${values._id}`, {
        ...updatedBranchData,
      });
      if (response.status == 200 && response.data.success == true) {
        actions.resetForm();
        toast.success(response.data.data.msg || "Branch Updated!");
        closeModalHandler();
        getBranches();
      } else {
        toast.error(response.response.data.error || "Something went wrong!");
      }
    }
  };

  const openModalHandler = () => {
    setFormType("add");
    setInitialData({});
    setIsModalOpen(true);
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  return (
    <div className="p-4">
      <div className="flex w-full flex-col sm:flex-row justify-between">
        <h2 className="text-xl font-bold mb-4">Branch</h2>
        {role == "superadmin" && (
          <div className="">
            <button
              type="button"
              onClick={openModalHandler}
              className="w-full rounded-lg flex gap-2 justify-center items-center bg-blue-500 py-1.5 px-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
            >
              <UserPlusIcon className="h-5" />
              Add Branch
            </button>
          </div>
        )}
      </div>
      <EditModal
        title={formType === "add" ? "Add Branch" : "Edit Branch"}
        isOpen={isModalOpen}
        closeModalHandler={closeModalHandler}
      >
        <DynamicForm
          formConfig={branchFormConfig}
          validationSchema={
            formType == "add" ? createBranchSchema : updateBranchSchema
          }
          onSubmit={handleSubmit}
          initialData={initialData}
          submitButtonText={
            formType === "add" ? "Create Branch" : "Update Branch"
          }
        />
      </EditModal>
      {isLoading ? (
        <DummyTable />
      ) : (
        <TableComponent
          data={allBranchData}
          columns={branchColumns(
            setFormType,
            handleEditBranch,
            handleDeleteBranch
          )}
          csvFileName={"Branch"}
        />
      )}
      <ConfirmModal
        title={"Are you sure you want to delete this Income?"}
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={closeConfirmModal}
        onConfirm={onConfirm}
      />
    </div>
  );
}
