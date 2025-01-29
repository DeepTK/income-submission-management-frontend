import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  branch: Yup.string().required("Branch is required"),
});

export const createUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Role is required"),
  branch: Yup.string().required("Branch is required"),
  isActive: Yup.boolean().default(true).nullable(),
});

export const updateUserSchema = Yup.object().shape({
  _id: Yup.string().required("User id is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().optional(),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .when("password", {
      is: (value) => value && value.length > 0,
      then: Yup.string().required("Confirm Password is required"),
      otherwise: Yup.string(),
    }),
  role: Yup.string().required("Role is required"),
  branch: Yup.string().optional(),
  isActive: Yup.boolean().default(true).nullable(),
});

export const createBranchSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string().required("Name is required"),
  isActive: Yup.boolean().default(true).nullable(),
});

export const updateBranchSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string().required("Name is required"),
  isActive: Yup.boolean().default(true).nullable(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const createIncomeSchema = Yup.object().shape({
  year: Yup.number()
    .required("Year is required")
    .min(2000, "Year must be at least 2000"),
  month: Yup.number()
    .required("Month is required")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  amount: Yup.number()
    .typeError("Income must be a number")
    .positive("Income must be a positive number")
    .required("Income is required"),
  comments: Yup.string().optional(),
});

export const editIncomeSchema = Yup.object().shape({
  income: Yup.number()
    .typeError("Income must be a number")
    .positive("Income must be a positive number")
    .required("Income is required"),
});

export const branchManagementSchema = Yup.object().shape({
  userId: Yup.string().required("User ID is required"),
  branch: Yup.string().required("Branch is required"),
});

export const reportFilterSchema = Yup.object().shape({
  branch: Yup.string().required("Branch is required"),
  startDate: Yup.date()
    .typeError("Invalid date format")
    .required("Start date is required"),
  endDate: Yup.date()
    .typeError("Invalid date format")
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date cannot be before start date"),
});
