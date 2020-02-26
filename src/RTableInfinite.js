import React from "react";
import { useTable, useSortBy, useFilters, useGlobalFilter, useFlexLayout, useResizeColumns } from "react-table";
import CustomInput from "./CustomInput";
import { InfiniteLoader, List as FixedSizeList, AutoSizer } from 'react-virtualized';
// import 'react-virtualized/styles.css';

window.Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    // eslint-disable-next-line
    return this.getTime() === this.getTime();
};

// value and onChange function
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
    console.log(setGlobalFilter, 'global filter')
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
 * loadMoreRows: this is the function to be called when new rows needs to be added
 * rowCount: the maximum number of rows we can have
 * height: height of the table body. If not passsed the row height will be 600 px
 */
const ReactTableInfinite = ({ columns, data, loadMoreRows, rowCount, height }) => {
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
    const defaultColumn = React.useMemo(() => ({
        // Let's set up our default Filter UI
        Filter: ColumnFilter,
        minWidth: 25,
        maxWidth: 400,
    }), [])
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
    );
    const isRowLoaded = ({ index }) => {
        return !!rows[index];
    }
    const RenderRow = ({ key, index, style }) => {
        const row = rows[index];
        if (!row) {
            return (
                <div key={key} className="tr bg-gray" />
            );
        }
        prepareRow(row);
        return (
            <div key={key} className="tr" {...row.getRowProps({ style })}>
                {row.cells.map(cell => {
                    return (
                        <div {...cell.getCellProps()} className="td">{cell.render("Cell")}</div>
                    );
                })}
            </div>
        );
    }
    return (
        <div>
            <div
                className="p-1 border-0 d-flex justify-content-end"
            >
                <GlobalFilter
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>
            <div className='table' {...getTableProps()}>
                <div className='thead'>
                    {headerGroups.map(headerGroup => (
                        <div {...headerGroup.getHeaderGroupProps()} className='tr'>
                            {headerGroup.headers.map((column, i) => {
                                // three new addition to column: isSorted, isSortedDesc, getSortByToggleProps
                                const {
                                    render,
                                    getHeaderProps,
                                    isSorted,
                                    isSortedDesc,
                                    getSortByToggleProps,
                                    //resizer
                                    isResizing,
                                    getResizerProps,
                                    // filter
                                    canFilter
                                } = column;
                                const extraClass = isSorted
                                    ? isSortedDesc
                                        ? "desc"
                                        : "asc"
                                    : "";
                                const { onClick, ...rest } = getHeaderProps(getSortByToggleProps())
                                return (
                                    <div
                                        key={`th-${i}`}
                                        className={`${extraClass} th`}
                                        {...rest}
                                    // getHeaderProps now receives a function
                                    >
                                        <div onClick={onClick}>
                                            {render("Header")}
                                        </div>
                                        {/* resizer div */}
                                        <div
                                            {...getResizerProps()}
                                            className={`resizer ${isResizing ? 'isResizing' : ''}`}
                                        />
                                        {/* Render the columns filter UI */}
                                        <div>{canFilter ? render("Filter") : null}</div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                <div {...getTableBodyProps()} className='tbody' >
                    <InfiniteLoader
                        // this function returns true if the row is already loaded
                        isRowLoaded={isRowLoaded}
                        // function to load more rows
                        loadMoreRows={loadMoreRows}
                        // number of rows
                        rowCount={rowCount}
                        // the 
                        threshold={20}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <AutoSizer>
                                {({ width }) => (
                                    <FixedSizeList
                                        className='border'
                                        height={height? height: 600}
                                        onRowsRendered={onRowsRendered}
                                        ref={registerChild}
                                        rowCount={rowCount}
                                        rowHeight={35}
                                        // renders row
                                        rowRenderer={RenderRow}
                                        width={width}
                                    />
                                )}
                        </AutoSizer>
                        )}
                    </InfiniteLoader>
                </div>
            </div>
        </div>
    );
};

export default ReactTableInfinite;
