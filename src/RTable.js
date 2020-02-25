import React from "react";
import { Table } from "react-bootstrap";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import CustomInput from "./CustomInput";

window.Date.prototype.isValid = function() {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  // eslint-disable-next-line
  return this.getTime() === this.getTime();
};
// value and onChange function
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <CustomInput
      value={globalFilter || ""}
      onChange={e => {
        setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search All ...`}
    />
  );
};

const ColumnFilter = ({ column: { filterValue, setFilter, filter } }) => {
  return (
    <CustomInput
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${filter ? filter : ""}...`}
    />
  );
};

/**
 * As in the previous versions, any react table needs colums where at the core we have a field Header, and accessor
 * As in the previous versions, a react table has data that consist of an array of JSONs
 */
const ReactTable = ({ columns, data }) => {
  // functions to run when a column is filtered depending on the type
  const filterTypes = {
    year: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue !== undefined &&
          Number(filterValue) &&
          new Date(rowValue) &&
          new Date(rowValue).isValid()
          ? new Date(rowValue).getFullYear() === Number(filterValue)
          : true;
      });
    },
    text: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          : true;
      });
    }
  };
  const defaultColumn = {
    // Let's set up our default Filter UI
    Filter: ColumnFilter
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    // hook for filters
    useFilters,
    useGlobalFilter,
    // hook for sorting
    useSortBy
  );
  console.log(visibleColumns);
  return (
    <div>
      <div
        className="p-1 border-0 d-flex justify-content-end"
        colSpan={visibleColumns.length}
      >
        <GlobalFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <Table bordered {...getTableProps()}>
        <thead>
          <tr />
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => {
                // three new addition to column: isSorted, isSortedDesc, getSortByToggleProps
                const {
                  render,
                  getHeaderProps,
                  isSorted,
                  isSortedDesc,
                  getSortByToggleProps,
                  // filter,
                  canFilter
                } = column;
                const extraClass = isSorted
                  ? isSortedDesc
                    ? "desc"
                    : "asc"
                  : "";
                return (
                  <th
                    key={`th-${i}`}
                    className={extraClass}
                    // getHeaderProps now receives a function
                  >
                    <div {...getHeaderProps(getSortByToggleProps())}>
                      {render("Header")}
                    </div>
                    {/* Render the columns filter UI */}
                    <div>{canFilter ? render("Filter") : null}</div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ReactTable;
