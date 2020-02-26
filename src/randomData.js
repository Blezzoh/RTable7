import Chance from "chance";
import styled from 'styled-components';
import React from 'react'

const makeRow = () => {
  const chance = new Chance();
  return {
    first: chance.name(),
    last: chance.last(),
    birthday: chance.birthday({ string: true }),
    zip: chance.zip(),
  }
}
export const rt7Expander = {
  // Make an expander cell
  Header: () => null, // No header
  id: 'expander', // It needs an ID
  width: 25,
  Cell: ({ row }) => (
    // Use Cell to render an expander for each row.
    // We can use the getToggleRowExpandedProps prop-getter
    // to build the expander.
    <span {...row.getToggleRowExpandedProps()}>
      {row.isExpanded ? '▼' : '►'}
    </span>
  ),
}
export default num => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({ ...makeRow(), });
  }
  return arr;
};

export const headers = [
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
  }
];

export const Styles = styled.div`
padding: 1rem;
.table {
  display: inline-block;
  border-spacing: 0;
  border: 1px solid #dee2e6;
  position: relative;
  .thead{
    overflow-y: scroll;
    overflow-x: hidden
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
    ${'' /* In this example we use an absolutely position resizer,
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
      ${'' /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;
      &.isResizing {
      }
    }
  }
}
`  
