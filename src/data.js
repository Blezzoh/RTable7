import Chance from "chance";
import styled from "styled-components";
import React from "react";
import CustomInput from "./CustomInput";


const SomeFilter = ({
  column: { filterValue, setFilter}
}) => {
  return (
    <CustomInput
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Age greater than...`}
    />
  );
};

const makeRow = () => {
  const chance = new Chance();
  return {
    age: chance.age(),
    first: chance.name(),
    last: chance.last(),
    birthday: chance.birthday({ string: true }),
    zip: chance.zip(),
    anotherfirst: chance.name(),
    anotherlast: chance.last(),
    anotherbirthday: chance.birthday({ string: true }),
    anotherzip: chance.zip(),
  };
};
export const rt7Expander = {
  // Make an expander cell
  Header: () => null, // No header
  id: "expander", // It needs an ID
  width: 25,
  Cell: ({ row }) => (
    // Use Cell to render an expander for each row.
    // We can use the getToggleRowExpandedProps prop-getter
    // to build the expander.
    <span {...row.getToggleRowExpandedProps()}>
      {row.isExpanded ? "▼" : "►"}
    </span>
  )
};
export default num => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({ ...makeRow() });
  }
  return arr;
};

export const headers = [
  {
    // Make an expander cell
    Header: () => null, // No header
    id: "expander", // It needs an ID
    width: 25,
    Cell: ({ row }) => (
      // Use Cell to render an expander for each row.
      // We can use the getToggleRowExpandedProps prop-getter
      // to build the expander.
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? "▼" : "►"}
      </span>
    )
  },
  {
    Header: "First",
    accessor: "first"
  },
  {
    Header: "Last",
    accessor: "last"
  },
  {
    Header: "Birthday",
    accessor: "birthday",
    filter: "year"
  },
  {
    Header: "Zip",
    accessor: "zip"
  },
];

export const ageHeader = {
  Header: "Age",
  accessor: "age",
  filter:'greater',
  Filter: SomeFilter
}

export const Styles = styled.div`
  padding: 1rem;
  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid #dee2e6;
    position: relative;
    overflow-x: visible;
    .thead-infinite {
      overflow-y: scroll;
    }
    .asc {
      border-top: 5px solid gray !important;
    }
    .desc {
      border-bottom: 5px solid gray !important;
    }
    .thead{
    }
    .tbody{
    }
    .tbody-infinite{

    }
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #dee2e6;
      border-right: 1px solid #dee2e6;
      ${"" /* In this example we use an absolutely position resizer,
     so this is required. */}
      position: relative;
      :last-child {
        border-right: 0;
      }
      .resizer {
        display: inline-block;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
        &.isResizing {
        }
      }
    }
  }
`;
window.Date.prototype.isValid = function() {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  // eslint-disable-next-line
  return this.getTime() === this.getTime();
};

// value and onChange function
export const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
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



export const filterTypes = {
    text: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
          : true;
      });
    },
    greater: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue !== undefined && !Number.isNaN(Number(rowValue)) && !Number.isNaN(Number(filterValue))
          ? Number(rowValue) > Number(filterValue)
          : true;
      });
    },
  };