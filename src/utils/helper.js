export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const calculateIncomeShares = (income) => {
  return {
    quarter: income * 0.25,
    tenth: income * 0.1,
    twentieth: income * 0.05,
  };
};

export const handleNumberChange = (e) => {
  const value = e.target.value;

  if (value === "") return "";

  if (/^\d*\.?\d*$/.test(value)) {
    if ((value.match(/\./g) || []).length <= 1) {
      if (value.startsWith(".")) {
        return `0${value}`;
      }
      if (value.length > 1 && value[0] === "0" && value[1] !== ".") {
        return value.replace(/^0+/, "");
      }
      return value;
    }
  }

  return e.target.value.slice(0, -1);
};

export const navigateToDashboard = (role, navigate) => {
  if (role === "superadmin") {
    navigate("/superadmin/");
  } else if (role === "admin") {
    navigate("/admin/");
  } else {
    navigate("/user/");
  }
};

export const navigateToPage = (role, navigate, route) => {
  if (role === "superadmin") {
    navigate("/superadmin/" + route);
  } else if (role === "admin") {
    navigate("/admin/" + route);
  } else {
    navigate("/user/" + route);
  }
};

export function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertToPieUserData(data) {
  return data.map((item) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[item._id.month - 1];
    const year = item._id.year;
    const label = `${month} ${year}`;
    const value = item.totalAmount;

    return { label, value };
  });
}

export const month = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

export const updateUserFormConfig = (setUserFormConfig, formType, isOwnData, role) => {
  setUserFormConfig((prevConfig) =>
    prevConfig.map((field) => {
      if (field.name === "password") {
        return {
          ...field,
          placeholder: formType === "add" ? "Enter password" : "Leave blank to keep current password",
          hidden: formType === "edit" ? false : false,
          disabled: formType === "edit" && !isOwnData && role === "admin",
        };
      }
      if (field.name === "cpassword") {
        return {
          ...field,
          hidden: formType === "edit" ? !isOwnData : false,
          disabled: formType === "edit" ? !isOwnData : false,
        };
      }
      return field;
    })
  );
};
