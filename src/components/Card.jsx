import React, { useContext } from "react";
import {navigateToPage} from '../utils/helper'
import { AuthContext } from "../context/AuthContext";
export default function Card(props) {
  const { data } = useContext(AuthContext);
  const { heading, description, footer, navigate, path } = props;
  return (
    <div onClick={()=>navigate ? navigateToPage(data.role, navigate, path) : null} className="max-w-sm bg-white border border-gray-200 hover:bg-slate-50 rounded-lg shadow">
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
