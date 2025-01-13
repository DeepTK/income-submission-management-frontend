import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { adminRoutes } from "../routes/Routes";
import NotFound from "../pages/NotFound";
import Sidebar from "../components/Sidebar";
import AdminPage from "../pages/AdminPage";
import { Navbar } from "../components/Navbar";
import { useAutoLogout } from "../utils/helper";
const AdminLayout = () => {
  const navigate = useNavigate()
  useAutoLogout(navigate)
  return (
    <div>
      <Sidebar routes={adminRoutes} />
      <div className="p-4 sm:ml-64 relative">
        <Navbar routes={adminRoutes} />
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <Routes>
            <Route path="/" element={<AdminPage />} />
            {adminRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path.replace("/admin/", "")}
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

export default AdminLayout;
