import React from "react";

const Button = ({ type = "submit", onClick, children }) => {
  const getButtonStyles = () => {
    switch (type) {
      case "submit":
        return "bg-lightgreen text-white hover:bg-green-500";
      case "cancel":
        return "bg-lightred text-white hover:bg-red-500";
      case "register":
        return "bg-lightblue text-white hover:bg-blue-500";
      case "login":
        return "bg-lightblue text-white hover:bg-blue-500";
      default:
        return "bg-gray-400 text-white hover:bg-gray-500";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-2 rounded-md transition-colors duration-300 ${getButtonStyles()}`}
    >
      {children}
    </button>
  );
};

export default Button;
