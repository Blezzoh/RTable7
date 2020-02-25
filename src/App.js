import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import random, { headers, Styles } from "./randomData";
import RTable from "./RTable";

const renderRowSubComponent = () => {
  const data = random(4);
  return (
    <Styles>
      <RTable columns={headers} data={data}  />
    </Styles>
  )
}
export default function App() {
  const data = random(20);
  return (
    <div className="App">
      <Styles>
        <RTable columns={headers} data={data} isExpandable={true} renderRowSubComponent={renderRowSubComponent} />
      </Styles>
    </div>
  );
}
