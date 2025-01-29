import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { superadminRoutes } from "../routes/Routes";
import Sidebar from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import useAutoLogout from "../hooks/useAutoLogout";
import { AuthContext } from "../context/AuthContext";
const SuperadminLayout = () => {
  const { clearAuth } = useContext(AuthContext);
  useAutoLogout(clearAuth);
  return (
    <div>
      <Sidebar routes={superadminRoutes} />
      <div className="p-4 sm:ml-64 relative">
        <Navbar routes={superadminRoutes} />
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperadminLayout;
