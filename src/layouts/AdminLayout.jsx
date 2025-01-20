import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { adminRoutes } from "../routes/Routes";
import Sidebar from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { useAutoLogout } from "../utils/helper";
const AdminLayout = () => {
  const navigate = useNavigate();
  useAutoLogout(navigate);
  return (
    <div>
      <Sidebar routes={adminRoutes} />
      <div className="p-4 sm:ml-64 relative">
        <Navbar routes={adminRoutes} />
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
