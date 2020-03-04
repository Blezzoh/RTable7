import React from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useFlexLayout,
  useResizeColumns,
  useExpanded
} from "react-table";
import PropTypes from "prop-types";

/**
 * As in the previous versions, any react table needs colums where at the core we have a field Header, and accessor
 * As in the previous versions, a react table has data that consist of an array of JSONs
 */
const ReactTable = ({
  columns, data, renderRowSubComponent, isExpandable, ColumnFilter, GlobalFilter, allowColumnFilter, allowGlobalFilter, filterTypes, renderBody, allowInfiniteScroll
}) => {
  // functions to run when a column is filtered depending on the type
  const defaultColumn = {
    // Let's set up our default Filter UI
    Filter: ColumnFilter,
    minWidth: 10,
    maxWidth: 400
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    // hooks for filters
    useFilters,
    useGlobalFilter,
    // hook for sorting
    useSortBy,
    // hooks for resizing
    useFlexLayout,
    useResizeColumns,
    // hooks for exander,
    useExpanded
  );
  return (
    <div>
      <div className="p-1 border-0 d-flex justify-content-end">{
        allowGlobalFilter ? <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        /> : null
      }

      </div>
      <div className="table" {...getTableProps()}>
        <div className={allowInfiniteScroll ? "thead-infinite" : "thead"}>
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column, i) => {
                // three new addition to column: isSorted, isSortedDesc, getSortByToggleProps
                const {
                  render,
                  getHeaderProps,
                  isSorted,
                  isSortedDesc,
                  getSortByToggleProps,
                  // filter,
                  canFilter,
                  //resizer
                  isResizing,
                  getResizerProps
                } = column;
                const extraClass = isSorted
                  ? isSortedDesc
                    ? "desc"
                    : "asc"
                  : "";
                const { onClick, ...rest } = getHeaderProps(
                  getSortByToggleProps()
                );
                return (
                  <div
                    key={`th-${i}`}
                    className={`${extraClass} th`}
                    {...rest}
                  // getHeaderProps now receives a function
                  >
                    <div onClick={onClick}>{render("Header")}</div>
                    {/* resizer div */}
                    <div
                      {...getResizerProps()}
                      className={`resizer ${isResizing ? "isResizing" : ""}`}
                    />
                    {/* Render the columns filter UI */}
                    <div>{canFilter && allowColumnFilter ? render("Filter") : null}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className={allowInfiniteScroll ? "tbody-infinite" : "tbody"}>
          {renderBody(rows, prepareRow, isExpandable, renderRowSubComponent)}
        </div>
      </div>
    </div>
  );
};

ReactTable.propTypes = {
  // Same as the previous versions
  columns: PropTypes.array.isRequired,
  // Same as the previous versions
  data: PropTypes.array.isRequired,
  // Function that renders a subcomponent,
  // in this case it is receiving a json containing a row, feel free to modify it
  renderRowSubComponent: PropTypes.func,
  // function to render the body. receives rows, prepareRowFunction, isExpandable, and renderRowSubComponent 
  renderBody: PropTypes.func,
  // Indicates if the table row has a subcomponent. By default false
  // if it is true, renderRowSubComponent should be defined
  isExpandable: PropTypes.bool,
  // Filter For a single Column: this is a function that returns a jsx(prerably an input)
  ColumnFilter: PropTypes.func,
  // Filter for all data : this is a function that returns a jsx(prerably an input)
  GlobalFilter: PropTypes.func,
  allowColumnFilter: PropTypes.bool,
  allowGlobalFilter: PropTypes.bool,
  // array of filters
  filterTypes: PropTypes.objectOf(PropTypes.func),
  // changes the table head and body classnames
  allowInfiniteScroll: PropTypes.bool
};

ReactTable.defaultProps = {
  isExpandable: false,
  allowColumnFilter: true,
  allowGlobalFilter: true,
  allowInfiniteScroll: false,
  ColumnFilter: ({ column: { filterValue, setFilter, filter } }) => {
    return (
      <input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${filter ? filter : ""}...`}
      />
    );
  },
  GlobalFilter: ({ globalFilter, setGlobalFilter }) => {
    return (
      <input
        value={globalFilter || ""}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search All ...`}
      />
    );
  },
  filterTypes: {
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
  },
  renderBody: (rows, prepareRow, isExpandable, renderRowSubComponent) => {
    return rows.map((row, i) => {
      prepareRow(row);
      return (
        <React.Fragment key={`rt-tb-trs${i}`}>
          <div className="tr" {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <div {...cell.getCellProps()} className="td">
                  {cell.render("Cell")}
                </div>
              );
            })}
          </div>
          {row.isExpanded && isExpandable ? (
            <div className="tr">
              <div>
                {/*
                        Inside it, call our renderRowSubComponent function. In reality,
                        you could pass whatever you want as props to
                        a component like this, including the entire
                        table instance. But for this example, we'll just
                        pass the row
                      */}
                {renderRowSubComponent({ row })}
              </div>
            </div>
          ) : null}
        </React.Fragment>
      );
    })
  }
}
export default ReactTable;
