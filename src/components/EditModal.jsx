import React from "react";

export default function EditModal({
  title,
  isOpen,
  closeModalHandler,
  children,
}) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center w-full p-4 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      aria-hidden={!isOpen}
      tabIndex="-1"
    >
      <div
        className={`relative w-full max-w-2xl bg-white rounded-lg shadow transition-transform ${
          isOpen ? "translate-y-0 scale-100" : "-translate-y-10 scale-95"
        }`}
      >
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            onClick={closeModalHandler}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
