import React from "react";
import { useFormik } from "formik";
import Input from "./Input";

const DynamicForm = ({
  formConfig,
  validationSchema,
  onSubmit,
  initialData = {},
  submitButtonText = "Submit",
  isLoading = false,
}) => {
  const generateInitialValues = () => {
    const initialValues = formConfig.reduce((acc, field) => {
      let defaultValue;
      switch (field.type) {
        case "select":
          defaultValue = field.isMulti ? [] : "";
          break;
        case "toggle":
          defaultValue = false;
          break;
        default:
          defaultValue = "";
      }
      acc[field.name] =
        initialData[field.name] != null
          ? initialData[field.name]
          : defaultValue;
      return acc;
    }, {});
    return initialValues;
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: generateInitialValues(),
    validationSchema: validationSchema ? validationSchema : undefined,
    onSubmit: (values, actions) => {
      onSubmit(values, actions);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="relative"
    >
      <div className="p-6 space-y-6">
        <div className="grid">
          {formConfig.map((field) => (
            <Input
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              touched={touched[field.name]}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              customOnChange={field.onChange}
              disabled={field.disabled}
            />
          ))}
        </div>
      </div>
      <div className="p-2">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-3 px-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
