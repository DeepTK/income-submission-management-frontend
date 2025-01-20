import React from "react";

export default function PopupModal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md transform transition-all">
          <div className="flex justify-between items-center border-b border-gray-200 p-4">
            <h2 className="text-lg font-bold text-gray-700"></h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              &#x2715;
            </button>
          </div>
          <div className="p-4 text-gray-600">{children}</div>
          <div className="flex justify-end items-center gap-2 border-t border-gray-200 p-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
