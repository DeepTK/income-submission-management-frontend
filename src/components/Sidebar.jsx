import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOnRectangleIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ routes }) => {
  const { clearAuth } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden"
        onClick={toggleSidebar}
      >
        <Bars3CenterLeftIcon className="h-6" />
      </button>
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-100 rounded-r-xl transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  to={`${route.path}`}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
                >
                  {route.icon}
                  <span className="ms-3">{route.label}</span>
                </Link>
              </li>
            ))}
            <li onClick={clearAuth}>
              <span className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 cursor-pointer">
                <ArrowLeftOnRectangleIcon className="h-6" />
                <span className="ms-3">Log out</span>
              </span>
            </li>
          </ul>
        </div>
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
