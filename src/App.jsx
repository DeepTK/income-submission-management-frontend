import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import SuperadminLayout from "./layouts/SuperadminLayout";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toast";
import { adminRoutes, superadminRoutes, userRoutes } from "./routes/Routes";
import AdminPage from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import SuperadminDashboard from "./pages/SuperadminDashboard";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" delay={3000} />
      <Router>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route index element={<Login />} />

          <Route
            path="/superadmin"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <SuperadminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<SuperadminDashboard />} />
            {superadminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminPage />} />
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="/user"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <UserLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            {userRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
