import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { CSVLink } from "react-csv";
import moment from "moment";

const TableComponent = ({ data, columns, csvFileName }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const excludeColumns = ["_id", "Actions"];
  const filteredData = data.map((row) => {
    const filteredRow = {};
    Object.keys(row).forEach((key) => {
      if (!excludeColumns.includes(key)) {
        filteredRow[key] = row[key];
      }
    });
    return filteredRow;
  });

  const footerData = table
    .getFooterGroups()
    .map((footerGroup) => {
      return footerGroup.headers
        .map((footer) => {
          if (excludeColumns.includes(footer.column.id)) return null;

          return {
            [footer.column.id]: footer.column.columnDef.footer?.(table) || "",
          };
        })
        .filter(Boolean);
    })
    .flat();
  const exportData = [...filteredData, ...footerData];

  return (
    <>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded outline-none focus:ring-blue-600 focus:border-blue-600"
        />
      </div>
      <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg [&::-webkit-scrollbar]:w-.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    scope="col"
                    key={header.id}
                    className="px-6 py-3 whitespace-nowrap"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    scope="row"
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr
                key={footerGroup.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                {footerGroup.headers.map((footer) => (
                  <td
                    scope="row"
                    key={footer.id}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {footer.column.columnDef.footer?.(table)}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className="mt-4 flex flex-col md:flex-col lg:flex-col xl:flex-row items-center justify-between gap-2 min-w-full">
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between items-center gap-2">
          <div className="flex justify-between items-center gap-2">
            <span>
              Page{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded"
              />
            </span>
          </div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center">
          <CSVLink
            data={exportData}
            filename={`${csvFileName}-${moment().format("DD-MM-YYYY")}.csv`}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
