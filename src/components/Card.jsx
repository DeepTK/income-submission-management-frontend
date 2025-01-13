import React from "react";

export default function Card(props) {
  const { heading, description, footer, navigateToPage } = props;
  return (
    <div onClick={()=>navigateToPage()} className="max-w-sm bg-white border border-gray-200 hover:bg-slate-50 rounded-lg shadow">
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {heading}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">{description}</p>
        <span className="inline-flex items-center  text-sm font-medium text-center text-gray-500 rounded-lg">
          {footer}
        </span>
      </div>
    </div>
  );
}
