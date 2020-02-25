import React from "react";
import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

export default class Pages extends React.Component {
  state = {
    active: 0
  };
  setNext = () => {
    const { pagelength } = this.props;
    const { active } = this.state;
    if (active >= pagelength - 1 || active === "new" || pagelength === 0) {
      return this.setActivePage("new");
    }
    return this.setActivePage(active + 1);
  };
  setPrevious = () => {
    const { pagelength } = this.props;
    const { active } = this.state;
    if ((active === "new" && pagelength === 0) || active === 0) {
      return this.setActivePage(active);
    }
    if (active === "new" && pagelength > 0) {
      return this.setActivePage(pagelength - 1);
    }
    if (pagelength > 0) {
      return this.setActivePage(active - 1);
    }
  };
  setActivePage(active) {
    this.setState({ active });
  }
  getPagesArray() {
    const { pagelength } = this.props;
    if (Number.isInteger(pagelength) && pagelength > 0) {
      let pages = [];
      for (let i = 1; i <= pagelength; i++) {
        pages = [...pages, i];
      }
      return pages;
    }
    return [];
  }

  render() {
    let { active } = this.state;
    const pages = this.getPagesArray();
    active = pages.length === 0 ? "new" : active;
    return (
      <Pagination>
        <Pagination.Prev onClick={() => this.setPrevious()} />
        {pages.map((d, i) => {
          return (
            <Pagination.Item
              key={i}
              active={active === i}
              onClick={() => this.setActivePage(i)}
            >
              {d}
            </Pagination.Item>
          );
        })}
        <Pagination.Item
          active={active === "new"}
          onClick={() => this.setActivePage("new")}
        >
          NEW
        </Pagination.Item>
        <Pagination.Next onClick={() => this.setNext()} />
      </Pagination>
    );
  }
}

Pagination.proptypes = {
  pagelength: PropTypes.number,
  setActivePage: PropTypes.func
};
