import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import random, { headers, Styles } from "./data";
import RTable from "./RTable";
import RTableInfinite from "./RTableInfinite";
import randomData from "./data";
import { Tabs, Tab } from "react-bootstrap";
import TypeAhead from './TypeAhead'

const renderRowSubComponent = () => {
  const data = random(4);
  return (
    <Styles>
      <RTable columns={headers} data={data} />
    </Styles>
  );
};
export default class App extends React.Component {
  state = {
    data: random(200),
    selected: [],
    isAllSelected: false,
    options: [
        { label: "Art", lastName: "Blakey", nameId: 1 },
        { label: "Jimmy", lastName: "Cobb", nameId: 2},
        { label: "Elvin", lastName: "Jones", nameId: 3 },
        { label: "Max", lastName: "Roach" , nameId: 4},
        { label: "Tony", lastName: "Williams", nameId: 5 }
    ]
  };
  addMoreData = ({ startIndex, stopIndex }) => {
    let { data } = this.state;
    data = [...data, ...randomData(stopIndex - startIndex + 1)];
    this.setState({ data });
  };
  handleSelectAll(){
    let selected = []
    const {options} = this.state
    selected = options.map(d => d.nameId)
    return this.setState({selected, isAllSelected: true})
  }
  handleSelect = (data) =>{
    let newSelection = []
    console.log(data)
    for (const d of data) {
      if(d.nameId === 'all'){
        return this.handleSelectAll()
      }
      newSelection = [...newSelection, d.nameId]
    }
    return this.setState({selected: newSelection, isAllSelected: newSelection.length === this.state.options.length})
  }
  render() {
    const { data, isAllSelected } = this.state;
    return (
      <div className="App">
        <Tabs defaultActiveKey="custom" id="uncontrolled-tab-example">
          <Tab eventKey="custom" title="Custom">
            <Styles>
              <RTable
                columns={headers}
                data={data}
                isExpandable={true}
                renderRowSubComponent={renderRowSubComponent}
              />
            </Styles>s
          </Tab>
          <Tab eventKey="infinite" title="Infinite Scroll">
            <Styles>
              <RTableInfinite
                rowCount={1000}
                columns={headers}
                data={data}
                loadMoreRows={this.addMoreData}
              />
            </Styles>
          </Tab>
          <Tab eventKey="typeahead" title="Type Ahead">
            <TypeAhead 
              idKey={'nameId'}
              selected={this.state.selected}
              handleSelect={d => this.handleSelect(d)}
              options={this.state.options}
              isAllSelected={isAllSelected}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
