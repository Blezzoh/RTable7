import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import random, { headers, Styles, filterTypes, ageHeader } from "./data";
import {ReactTable, ReactTableInfinite} from './reactTables'
import { Tabs, Tab} from "react-bootstrap";

const renderRowSubComponent = () => {
  const data = random(4);
  return (
    <Styles>
      <ReactTable columns={headers} data={data} />
    </Styles>
  );
};
export default class App extends React.Component {
  state = {
    data: random(200),
  };
  addMoreData = ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    data = [...data, ...random(stopIndex - startIndex + 1)];
    this.setState({ data });
  };
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <Tabs defaultActiveKey="custom" id="uncontrolled-tab-example">
          <Tab eventKey="custom" title="Simple">
            <Styles>
              <ReactTable
                columns={headers.slice(1)}
                data={data}
              />
            </Styles>
          </Tab>
          <Tab eventKey="subcomponent" title="Sortable and Expandable">
            <Styles>
              <ReactTable
                columns={headers}
                data={data}
                isExpandable={true}
                renderRowSubComponent={renderRowSubComponent}
                allowColumnFilter={true}
              />
            </Styles>
          </Tab>
          <Tab eventKey="infinite" title="Infinite Scroll">
            <Styles>
              <ReactTableInfinite
                rowCount={1000}
                columns={headers.slice(1)}
                data={data}
                loadMoreRows={this.addMoreData}
              />
            </Styles>
          </Tab>
          <Tab eventKey='custom Filters' title='Filters'>
          <Styles>
              <ReactTable
                columns={[...headers.slice(1), ageHeader]}
                data={data}
                isExpandable={false}
                renderRowSubComponent={renderRowSubComponent}
                allowColumnFilter={true}
                filterTypes={filterTypes}
              />
            </Styles>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
