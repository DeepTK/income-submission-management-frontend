import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { userRoutes } from "../routes/Routes";
import NotFound from "../pages/NotFound";
import UserPage from "../pages/UserPage";
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
          <Routes>
            <Route path="/" element={<UserPage />} />
            {userRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path.replace("/user/", "")}
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

export default UserLayout;
