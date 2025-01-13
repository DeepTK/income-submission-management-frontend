import React from "react";

const ConfirmModal = ({
  title,
  isConfirmModalOpen,
  closeConfirmModal,
  onConfirm,
}) => {
  return (
    <div
      className={`${
        isConfirmModalOpen ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full translate-y-[-20%]">
        <div className="relative bg-white rounded-lg shadow-lg">
          <button
            onClick={closeConfirmModal}
            type="button"
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
          <div className="p-6 flex flex-col justify-between text-center min-h-60">
            <div>
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500">{title}</h3>
            <div className="flex justify-center items-center">
              <button
                onClick={async () => {
                  if (onConfirm) {
                    await onConfirm();
                  }
                  closeConfirmModal();
                }}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={closeConfirmModal}
                type="button"
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
