import React from "react";
import {
  InfiniteLoader,
  List as FixedSizeList,
  AutoSizer
} from "react-virtualized";
import PropTypes from "prop-types";
import ReactTable from './RTable'
/**
 * As in the previous versions, any react table needs colums where at the core we have a field Header, and accessor
 * As in the previous versions, a react table has data that consist of an array of JSONs
 * loadMoreRows: this is the function to be called when new rows needs to be added
 * rowCount: the maximum number of rows we can have
 * height: height of the table body. If not passsed the row height will be 600 px
 */
const ReactTableInfinite = ({
  columns,
  data,
  loadMoreRows,
  rowCount,
  height,
  filterTypes,
  ColumnFilter, GlobalFilter,
  allowColumnFilter, allowGlobalFilter,
  threshold
}) => {
  const isRowLoaded = ({ index }, rows) => {
    return !!rows[index];
  };
  const RenderRow = (rowArgs, rows,prepareRow) => {
    const { key, index, style } = rowArgs
    const row = rows[index];
    if (!row) {
      return <div key={key} className="tr bg-gray" />;
    }
    prepareRow(row);
    return (
      <div key={key} className="tr" {...row.getRowProps({ style })}>
        {row.cells.map(cell => {
          return (
            <div {...cell.getCellProps()} className="td">
              {cell.render("Cell")}
            </div>
          );
        })}
      </div>
    );
  };
  return <ReactTable
    isExpandable={false}
    data={data}
    columns={columns} allowGlobalFilter={allowGlobalFilter}
    filterTypes={filterTypes} allowColumnFilter={allowColumnFilter}
    ColumnFilter={ColumnFilter} GlobalFilter={GlobalFilter}
    allowInfiniteScroll={true}
    renderBody={(rows, prepareRow) => {
      return (
        <InfiniteLoader
          // this function returns true if the row is already loaded
          isRowLoaded={rowArgs => isRowLoaded(rowArgs, rows)}
          // function to load more rows
          loadMoreRows={loadMoreRows}
          // number of rows
          rowCount={rowCount}
          // threshold to start loading new data
          threshold={threshold}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width }) => (
                <FixedSizeList
                  className="border"
                  height={height ? height : 600}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                  rowCount={rowCount}
                  rowHeight={35}
                  // renders row
                  rowRenderer={rowArgs => RenderRow(rowArgs, rows, prepareRow)}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )
    }}
  />

};

ReactTableInfinite.propTypes = {
  // Same as the previous versions
  columns: PropTypes.array.isRequired,
  // Same as the previous versions
  data: PropTypes.array.isRequired,
  // function that receives an json { startIndex, stopIndex }
  // this is meant to load more data and add it to the data prop
  loadMoreRows: PropTypes.func.isRequired,
  // Threshold at which to pre-fetch data. A threshold X means that data will start loading when a user scrolls within X rows. Defaults to 15.
  threshold: PropTypes.number,
  // the row count
  rowCount: PropTypes.number.isRequired,
  // height of the reac-table body by default it will be 800px
  height: PropTypes.number,
  ColumnFilter: PropTypes.func,
  // Filter for all data : this is a function that returns a jsx(prerably an input)
  GlobalFilter: PropTypes.func,
  allowColumnFilter: PropTypes.bool,
  allowGlobalFilter: PropTypes.bool,
  filterTypes: PropTypes.objectOf(PropTypes.func),

};

ReactTableInfinite.defaultProps = {
  isExpandable: false,
  threshold: 15,
}

export default ReactTableInfinite;
