import React, { useState } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import random, { headers, Styles } from "./randomData";
import RTable from "./RTable";
import RTableInfinite from './RTableInfinite'
import randomData from "./randomData";

const renderRowSubComponent = () => {
  const data = random(4);
  return (
    <Styles>
      <RTable columns={headers} data={data} />
    </Styles>
  )
}
export default class App extends React.Component {
  state ={
    data: random(200)
  }
  addMoreData = ({ startIndex, stopIndex }) => {
    let {data} = this.state
    data = [...data, ...randomData(stopIndex - startIndex + 1)]
    this.setState({data})
  }
  render(){
    const {data} = this.state
    return (
      <div className="App">
        <Styles>
          <RTable columns={headers} data={data} isExpandable={true} renderRowSubComponent={renderRowSubComponent} />
        </Styles>
        <Styles>
          <RTableInfinite rowCount={1000} columns={headers} data={data} loadMoreRows={this.addMoreData} />
        </Styles>
      </div>
    )
  }
}
