import React, { useState, useEffect, useRef, useContext } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helper";

export const Navbar = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { clearAuth, data } = useContext(AuthContext);
  const routes = props.routes;

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="bg-gray-100 border-gray-200 rounded-xl mb-3">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Welcome {capitalizeFirstLetter(data.name)}
          </span>
        </span>
        <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="flex text-sm"
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <UserIcon className="h-6" />
            </button>
            <div
              className={`absolute right-0 z-10 top-full mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform ${
                isDropdownOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">{data.name}</span>
                <span className="block text-sm text-gray-500 truncate">
                  {data.email}
                </span>
              </div>
              <ul className="py-2">
                {routes.map((route, index) => (
                  <li key={index} className="">
                    <Link
                      to={route.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {route.label}
                    </Link>
                  </li>
                ))}
                <li onClick={clearAuth}>
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
