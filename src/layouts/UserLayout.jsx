import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userRoutes } from "../routes/Routes";
import Sidebar from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { useAutoLogout } from "../utils/helper";

const UserLayout = () => {
  const navigate = useNavigate();
  useAutoLogout(navigate);
  return (
    <div>
      <Sidebar routes={userRoutes} />
      <div className="p-4 sm:ml-64 relative">
        <Navbar routes={userRoutes} />
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
