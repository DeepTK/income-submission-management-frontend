// App.jsx
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toast";
import SuperadminDashboard from "./pages/SuperadminDashboard";
import SuperadminLayout from "./layouts/SuperadminLayout";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" delay={3000}></ToastContainer>
      <Router>
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/superadmin/*"
            element={
              <PrivateRoute allowedRoles={["superadmin"]}>
                <SuperadminLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <PrivateRoute allowedRoles={["user"]}>
                <UserLayout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
