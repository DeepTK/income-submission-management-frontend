import React from "react";

export default function PopupModal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Modal Title</h2>
            <button
              onClick={closeModal}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </div>
          <div className="mt-4">{children}</div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
