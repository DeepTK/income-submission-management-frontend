import React, { useContext, useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { userColumns, productColumns } from "../utils/tableColumns";
import api from "../service/api.service";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toast";
import EditModal from "../components/EditModal";
import { createUserSchema, updateUserSchema } from "../utils/validationSchemas";
import DynamicForm from "../components/DynamicForm";
import ConfirmModal from "../components/ConfirmModal";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import DummyTable from "../components/DummyTable";
import { emailRegex, updateUserFormConfig } from "../utils/helper";

export default function AllUsers() {
  const { role, data } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [initialData, setInitialData] = useState({});
  const [formType, setFormType] = useState("add");
  const [userData, setUserData] = useState([]);

  const handleEditUser = (user) => {
    setFormType("edit");
    const isOwnData = user._id === data._id;
    const userToEdit =
      isOwnData || role == "superadmin"
        ? { ...user, branch: user.branch._id, password: "", cpassword: "" }
        : { ...user, branch: user.branch._id };
    setInitialData(userToEdit);
    updateUserFormConfig(setUserFormConfig, "edit", isOwnData, role);
    setIsModalOpen(true);
  };

  const [onConfirm, setOnConfirm] = useState(null);
  const handleDeleteUser = (user) => {
    const confirmDelete = async () => {
      try {
        const response = await api.get(`/user/delete/${user._id}`);
        if (response.status === 200 && response.data.success === true) {
          toast.success(response.data.msg || "User deleted successfully!");
          getUserData();
        } else {
          toast.error(response.data.error || "Failed to delete user.");
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

  const getUserData = async () => {
    setIsLoading(true);
    if (role == "superadmin") {
      const response = await api.get(`/user`);
      if (response.status == 200 && response.data.success == true) {
        const result = response.data;
        setUserData(result.data);
        setIsLoading(false);
      } else {
        toast.error(response.response.data.error || "Something went wrong!");
        setIsLoading(false);
      }
    } else if (role == "admin") {
      const response = await api.get(`/user/branch/${data.branch._id}`);
      if (response.status == 200 && response.data.success == true) {
        const result = response.data;
        setUserData(result.data);
        setIsLoading(false);
      } else {
        toast.error(response.response.data.error || "Something went wrong!");
        setIsLoading(false);
      }
    } else if (role == "user") {
      const response = await api.get(`/user/${data._id}`);
      if (response.status == 200 && response.data.success == true) {
        const result = response.data;
        setUserData([result.data]);
        setIsLoading(false);
      } else {
        toast.error(response.response.data.error || "Something went wrong!");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => {
    setFormType("add");
    setInitialData({});
    updateUserFormConfig(setUserFormConfig, "add", false, role);
    setIsModalOpen(true);
  };
  const closeModalHandler = () => {
    setInitialData({});
    setIsModalOpen(false);
  };

  const [branchData, setBranchData] = useState([]);

  const [userFormConfig, setUserFormConfig] = useState([
    {
      name: "_id",
      label: "ID",
      type: "text",
      placeholder: "User Id",
      hidden: true,
      disabled: true,
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your Name",
      hidden: false,
      disabled: false,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      hidden: false,
      disabled: false,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      hidden: false,
      disabled: false,
    },
    {
      name: "cpassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Re-enter password to confirm",
      disabled: false,
      hidden: false,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options:
        role === "superadmin"
          ? [
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
              { value: "superadmin", label: "Super Admin" },
            ]
          : role === "admin"
          ? [
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]
          : role === "user"
          ? [{ value: "user", label: "User" }]
          : [],
      placeholder: "Select user role",
      hidden: false,
      disabled: false,
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      options: [],
      placeholder: "Select your branch",
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

  const getBranches = async () => {
    const response = await api.get("/branch");
    if (response.status == 200 && response.data.success == true) {
      const result = response.data.data;
      setBranchData(result);
    } else {
      toast.error(response.response.data.error || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (data && branchData.length > 0) {
      const branchOptions =
        role === "admin" && data.branch._id
          ? branchData
              .filter((branch) => branch._id === data.branch._id)
              .map((branch) => ({
                value: branch._id,
                label: branch.name,
              }))
          : branchData.map((branch) => ({
              value: branch._id,
              label: branch.name,
            }));

      setUserFormConfig((prevConfig) =>
        prevConfig.map((field) =>
          field.name === "branch" ? { ...field, options: branchOptions } : field
        )
      );
    }
  }, [branchData, data, role]);

  useEffect(() => {
    getBranches();
  }, []);

  const handleSubmit = async (values, actions) => {
    if (formType == "add") {
      setIsLoading(true);
      const newUserData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        branch: values.branch,
        isActive: values.isActive ?? true,
      };
      const response = await api.post(`/auth/register`, {
        ...newUserData,
      });
      if (response.status == 201 && response.data.success == true) {
        const result = response.data;
        actions.resetForm();
        toast.success(result.msg || "User Updated!");
        setFormType("add");
        closeModalHandler();
        getUserData();
        setIsLoading(false);
      } else {
        toast.error(response.response.data.error || "Something went wrong!");
      }
    } else {
      setIsLoading(true);
      const updatedUserData = {
        name: values.name,
        email: values.email,
        role: values.role,
        branch: values.branch,
        isActive: values.isActive === true ? true : false,
      };

      if (values.password) {
        updatedUserData.password = values.password;
      }

      if (!values.name) {
        return toast.error("Please enter user name")
      }
      if (!emailRegex.test(values.email)) {
        return toast.error("Please enter valid user email")
      }

      if (!values.role) {
        return toast.error("Please choose user role")
      }

      if (!values.branch) {
        return toast.error("Please choose user branch")
      }

      if (!values.isActive) {
        return toast.error("Please choose user status")
      }

      const response = await api.post(`/user/update/${values._id}`, {
        ...updatedUserData,
      });
      if (response.status == 200 && response.data.success == true) {
        const result = response.data;
        actions.resetForm();
        toast.success(result.msg || "User Updated!");
        setFormType("add");
        closeModalHandler();
        getUserData();
      } else {
        toast.error(response.response.data.error || "Something went wrong!");
      }
    }
  };

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  return (
    <div className="p-4">
      <div className="flex w-full flex-col sm:flex-row justify-between">
        <h2 className="text-xl font-bold mb-4">User</h2>
        {(role == "admin" || role == "superadmin") && (
          <div className="">
            <button
              type="button"
              onClick={openModalHandler}
              className="w-full rounded-lg flex gap-2 justify-center items-center bg-blue-500 py-1.5 px-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
            >
              <UserPlusIcon className="h-5" />
              Add User
            </button>
          </div>
        )}
      </div>
      {isLoading ? (
        <DummyTable />
      ) : (
        <TableComponent
          data={userData}
          columns={userColumns(setFormType, handleEditUser, handleDeleteUser)}
          csvFileName={"Users"}
        />
      )}
      <EditModal
        title={formType === "add" ? "Add User Details" : "Edit User Details"}
        isOpen={isModalOpen}
        closeModalHandler={closeModalHandler}
      >
        <DynamicForm
          formConfig={userFormConfig}
          validationSchema={formType === "add" ? createUserSchema : undefined}
          onSubmit={handleSubmit}
          initialData={initialData}
          submitButtonText={formType === "add" ? "Create User" : "Update User"}
        />
      </EditModal>
      <ConfirmModal
        title={"Are you sure you want to disable this user?"}
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={closeConfirmModal}
        onConfirm={onConfirm}
      />
    </div>
  );
}
