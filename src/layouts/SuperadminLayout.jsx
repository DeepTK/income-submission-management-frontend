import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { superadminRoutes } from "../routes/Routes";
import NotFound from "../pages/NotFound";
import Sidebar from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import SuperadminDashboard from "../pages/SuperadminDashboard";
import { useAutoLogout } from "../utils/helper";
const SuperadminLayout = () => {
  const navigate = useNavigate();
  useAutoLogout(navigate);
  return (
    <div>
      <Sidebar routes={superadminRoutes} />
      <div className="p-4 sm:ml-64 relative">
        <Navbar routes={superadminRoutes} />
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <Routes>
            <Route path="/" element={<SuperadminDashboard />} />
            {superadminRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path.replace("/superadmin/", "")}
                element={route.component}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperadminLayout;
