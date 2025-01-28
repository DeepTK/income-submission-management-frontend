import React, { useContext, useEffect, useState } from "react";
import { loginSchema, registrationSchema } from "../utils/validationSchemas";
import leftImage from "../assets/left.jpg";
import DynamicForm from "../components/DynamicForm";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../service/api.service";
import { toast } from "react-toast";
import { navigateToDashboard } from "../utils/helper";

const Login = () => {
  const { token, role, data, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");
  const [branchData, setBranchData] = useState([]);
  const [loginFormConfig, setLoginFormConfig] = useState([
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ]);

  const [registerFormConfig, setRegisterFormConfig] = useState([
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your Name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
    {
      name: "cpassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Enter your Confirm Password",
    },
    {
      name: "branch",
      label: "Branch",
      type: "select",
      options: [],
      placeholder: "Select your Branch",
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
    if (branchData && branchData.length) {
      const branchOptions = branchData.map((branch) => ({
        value: branch._id,
        label: branch.name,
      }));

      setRegisterFormConfig((prevConfig) =>
        prevConfig.map((field) =>
          field.name === "branch" ? { ...field, options: branchOptions } : field
        )
      );
    }
  }, [branchData]);

  useEffect(() => {
    if (formType == "register") {
      getBranches();
    }
  }, [formType]);

  const handleSubmit = async (values, actions) => {
    if (formType == "login") {
      const response = await api.post("/auth/login", { ...values });
      if (response.status == 200 && response.data.success == true) {
        const { token, data } = response.data;
        const role = data.role;
        setAuth(token, role, data);
        actions.resetForm();
        navigateToDashboard(role, navigate);
        toast.success("Authentication successful!");
      } else {
        toast.error(response.response.data.error || "Something went wrong!");
      }
    } else if (formType == "register") {
      const response = await api.post("/auth/register", { ...values });
      if (response.status == 201 && response.data.success == true) {
        const result = response.data;
        actions.resetForm();
        toast.success(result.msg || "User created!");
        setFormType("login");
      } else {
        toast.error(response.response.data.error || "Something went wrong!");
      }
    }
  };

  useEffect(() => {
    if (token && role && data) {
      navigateToDashboard(role, navigate);
    }
  }, [token, role, data]);

  return (
    <div className="h-screen flex">
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${leftImage})` }}
      ></div>
      <div className="w-full md:w-1/2 flex pt-10 justify-center bg-gray-100 border border-stroke bg-transparent border-l">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-left mb-3">
            {formType == "login" ? "Login" : "Sign up"}
          </h2>
          <hr />
          <DynamicForm
            formConfig={
              formType === "login" ? loginFormConfig : registerFormConfig
            }
            validationSchema={
              formType === "login" ? loginSchema : registrationSchema
            }
            onSubmit={handleSubmit}
            submitButtonText={formType === "login" ? "Login" : "Sign up"}
          />
          <hr className="mt-3" />
          <div className="my-3">
            <span className="text-gray-500">
              {formType == "login"
                ? "Doesn't have an account yet?"
                : "Already have an account."}
            </span>
            <span
              className="ml-2 text-blue-600 cursor-pointer underline"
              onClick={() => {
                setFormType((prevVal) =>
                  prevVal == "login" ? "register" : "login"
                );
              }}
            >
              {formType == "login" ? "Sign up" : "Log in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
