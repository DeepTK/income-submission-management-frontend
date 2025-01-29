import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { capitalizeFirstLetter } from "./helper";
export const userColumns = (setFormType, onEdit, onDelete) => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => {
      const branch = row.original.branch;
      return branch ? <span>{branch.name}</span> : <span>-</span>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return role ? <span>{capitalizeFirstLetter(role)}</span> : <span>-</span>;
    },
  },

  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <span
            className={`font-medium ${
              row.original.isActive ? "text-green-600" : "text-red-600"
            } hover:underline`}
          >
            {row.original.isActive ? "Active" : "Blocked"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      return (
        <span>{moment(row.original.createdAt).format("DD-MM-YYYY HH:ss")}</span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
    cell: ({ row }) => {
      return (
        <span>{moment(row.original.updatedAt).format("DD-MM-YYYY HH:ss")}</span>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <button
          className="font-medium text-yellow-400 hover:underline"
          onClick={() => {
            setFormType("edit");
            onEdit(row.original);
          }}
        >
          <PencilSquareIcon className="h-5" />
        </button>
        <button
          className="font-medium text-red-400 hover:underline"
          onClick={() => onDelete(row.original)}
        >
          <TrashIcon className="h-5" />
        </button>
      </div>
    ),
  },
];

export const branchColumns = (setFormType, onEdit, onDelete) => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }) => {
      const manager = row.original.manager;
      return manager ? <span>{manager.name}</span> : <span>-</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <span
            className={`font-medium ${
              row.original.isActive ? "text-green-600" : "text-red-600"
            } hover:underline`}
          >
            {row.original.isActive ? "Active" : "Blocked"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      return (
        <span>{moment(row.original.createdAt).format("DD-MM-YYYY HH:ss")}</span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
    cell: ({ row }) => {
      return (
        <span>{moment(row.original.updatedAt).format("DD-MM-YYYY HH:ss")}</span>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        {localStorage.getItem("role") != "user" && (
          <>
            <button
              className="font-medium text-yellow-400 hover:underline"
              onClick={() => {
                setFormType("edit");
                onEdit(row.original);
              }}
            >
              <PencilSquareIcon className="h-5" />
            </button>
            <button
              className="font-medium text-red-400 hover:underline"
              onClick={() => onDelete(row.original)}
            >
              <TrashIcon className="h-5" />
            </button>
          </>
        )}
      </div>
    ),
  },
];
export const incomeColumns = (setFormType, onEdit, handleDeleteIncome) => [
  {
    accessorKey: "userName",
    header: "User name",
  },
  {
    accessorKey: "branchName",
    header: "Branch Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    footer: (table) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + row.original.amount, 0);
      return `₹${total}`;
    },
  },
  {
    accessorKey: "quarter",
    header: "Quarter (1/4)",
    footer: (table) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + row.original.quarter, 0);
      return `₹${total}`;
    },
  },
  {
    accessorKey: "tenth",
    header: "Tenth (1/10)",
    footer: (table) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + row.original.tenth, 0);
      return `₹${total}`;
    },
  },
  {
    accessorKey: "twentieth",
    header: "Twentieth (1/20)",
    footer: (table) => {
      const total = table
        .getFilteredRowModel()
        .rows.reduce((sum, row) => sum + row.original.twentieth, 0);
      return `₹${total}`;
    },
  },
  {
    accessorKey: "submissionDate",
    header: "submissionDate",
    cell: ({ row }) => {
      return (
        <span>
          {moment(row.original.submissionDate).format("DD-MM-YYYY HH:ss")}
        </span>
      );
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      return (
        <span>{moment(row.original.createdAt).format("DD-MM-YYYY HH:ss")}</span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
    cell: ({ row }) => {
      return (
        <span>{moment(row.original.updatedAt).format("DD-MM-YYYY HH:ss")}</span>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        {localStorage.getItem("role") == "user" && (
          <>
            <button
              className="font-medium text-yellow-400 hover:underline"
              onClick={() => {
                setFormType("edit"), onEdit(row.original);
              }}
            >
              <PencilSquareIcon className="h-5" />
            </button>
            <button
              className="font-medium text-red-400 hover:underline"
              onClick={() => handleDeleteIncome(row.original)}
            >
              <TrashIcon className="h-5" />
            </button>
          </>
        )}
      </div>
    ),
  },
];

export const productColumns = (onNavigate) => [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <button
        className="font-medium text-purple-500 hover:underline"
        onClick={() => onNavigate(row.original)}
      >
        Details
      </button>
    ),
  },
];
