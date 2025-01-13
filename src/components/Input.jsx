import React from "react";
import Select from "react-select";

const Input = ({
  field,
  value,
  error,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  disabled,
  hidden,
  customOnChange,
}) => {
  const commonclassNamees = `
    shadow-sm ${
      disabled || field.disabled
        ? "bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 cursor-not-allowed"
        : "bg-gray-50"
    } ${
    hidden || field.hidden ? "hidden" : ""
  } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 outline-none     
    ${error && touched ? "border-red-500" : ""}
  `;

  const renderInputField = () => {
    switch (field.type) {
      case "toggle":
        return (
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name={field.name}
              className="sr-only peer"
              checked={value}
              onChange={(e) => setFieldValue(field.name, e.target.checked)}
              onBlur={handleBlur}
              disabled={disabled || field.disabled}
            />
            <div
              className={`relative w-11 h-6 bg-gray-200 rounded-full peer 
              peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-fullpeer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600
              ${
                disabled || field.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            ></div>
            {field.helpText && (
              <span className="ms-3 text-sm font-medium text-gray-900">
                {field.helpText}
              </span>
            )}
          </label>
        );
      case "text":
      case "number":
      case "email":
      case "password":
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            className={commonclassNamees}
            value={value}
            onChange={(e) => {
              const newValue = customOnChange
                ? customOnChange(e)
                : e.target.value;
              setFieldValue(field.name, newValue);
            }}
            onBlur={handleBlur}
            disabled={disabled || field.disabled}
          />
        );

      case "select":
        return (
          <Select
            name={field.name}
            options={field.options}
            value={field.options.find((opt) => opt.value === value)}
            onChange={(option) => {
              setFieldValue(field.name, option.value);
            }}
            isSearchable
            onBlur={handleBlur}
            isMulti={field.isMulti}
            isDisabled={disabled || field.disabled}
            className="text-black bg-gray-50"
            classNameNamePrefix="select"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={` ${hidden || field.hidden ? "hidden" : ""} mb-2`}>
      <label className="block mb-2 text-sm font-medium text-gray-600">
        {field.label}
      </label>
      <div className="flex w-full justify-center items-center">
        <div className="w-full">
          {renderInputField()}
          {error && touched && (
            <p className="mt-2 ml-1 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
