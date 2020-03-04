import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Tabs, Tab, Row, Col, Button, ButtonGroup, Popover, Overlay, ListGroup } from "react-bootstrap";
import TypeAhead from './TypeAhead'
import { makeMessages } from "./dataMsg";
import ExampleMessage from "./messages/examples/ExampleMessage";
import Icon from "react-icons-kit";
import {closeCircled} from 'react-icons-kit/ionicons/closeCircled'

export default class App extends React.Component {
  state = {
    selected: [],
    isAllSelected: false,
    menuLeft: ['something', 'another something'],
    menuRight: ['dogs', 'other pigs'],
    menuEvent1: false,
    menuEvent2: false,
    options: [
      { client: "Art Blakey", accountId: 1 },
      { client: "Jimmy Cobb", accountId: 2 },
      { client: "Elvin Jones", accountId: 3 },
      { client: "Max Roach", accountId: 4 },
      { client: "Tony Williams", accountId: 5 },
      { client: "Art Blakey", accountId: 6 },
      { client: "Jimmy Cobb", accountId: 7 },
      { client: "Elvin Jones", accountId: 8 },
      { client: "Max Roach", accountId: 9 },
      { client: "Tony Williams", accountId: 10 },
      { client: "Art Blakey", accountId: 11 },
      { client: "Jimmy Cobb", accountId: 12 },
      { client: "Elvin Jones", accountId: 13 },
      { client: "Max Roach", accountId: 14 },
      { client: "Tony Williams", accountId: 15 },
      { client: "Art Blakey", accountId: 16 },
      { client: "Jimmy Cobb", accountId: 17 },
      { client: "Elvin Jones", accountId: 18 },
      { client: "Max Roach", accountId: 19 },
      { client: "Tony Williams", accountId: 20 }
    ]
  };
  menuLeftRef = React.createRef()
  handleSelectAll() {
    let selected = []
    const { options } = this.state
    selected = options.map(d => d.accountId)
    return this.setState({ selected, isAllSelected: true })
  }
  handleSelect = (data) => {
    let newSelection = []
    console.log(data)
    for (const d of data) {
      if (d.accountId === 'all') {
        return this.handleSelectAll()
      }
      newSelection = [...newSelection, d.accountId]
    }
    return this.setState({ selected: newSelection, isAllSelected: newSelection.length === this.state.options.length })
  }
  handleClose(menuName){
    this.setState({[menuName]: false})
  }
  handleClick(e, eventType) {
    e.preventDefault()
    if (e.type === 'contextmenu') {
      if (eventType === 'event1') {
        this.setState({ menuEvent1: true })
      }
      if (eventType === 'event2') {
        this.setState({ menuEvent2: true })
      }
    }
    if (e.type === 'dblclick' || e.type === 'click') {
      if (eventType === 'event1') {
        this.setState({ menuEvent1: false })
      }
      if (eventType === 'event2') {
        this.setState({ menuEvent2: false })
      }
    }
  }
  render() {
    const { isAllSelected } = this.state;
    const msgs = makeMessages(10)
    console.log(msgs)
    return (
      <div className="App">
        <Tabs defaultActiveKey="typeahead" id="uncontrolled-tab-example">
          <Tab eventKey="typeahead" title="Type Ahead">

            <Row>
              <Col lg={6} className='m-5'>
                <TypeAhead
                  idKey={'accountId'}
                  defaultLabel='client'
                  selected={this.state.selected}
                  handleSelect={d => this.handleSelect(d)}
                  options={this.state.options}
                  isAllSelected={isAllSelected}
                  placeholder={'select'}
                  renderLabel={d => `${d.client}`}
                  allowAllSelection={true}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <ButtonGroup>
                  <Button
                    ref={this.menuLeftRef}
                    onClick={
                      e => {
                        this.handleClick(e, 'event1')
                      }
                    }
                    onDoubleClick={
                      e => {
                        this.handleClick(e, 'event1')
                      }
                    }
                    onContextMenu={e => {
                      this.handleClick(e, 'event1')
                    }}
                  >Try Event</Button>
                  <Overlay target={this.menuLeftRef.current} show={this.state.menuEvent1} placement="right">
                    {/* <Menu type={'Phone'} menus={this.state.menuLeft} /> */}
                    {Menu(this.state.menuLeft, 'Phone', undefined, ()=>this.handleClose('menuEvent1'))}
                  </Overlay>
                  <Button
                    onDoubleClick={
                      e => {
                        this.handleClick(e, 'event2')
                      }
                    }
                    onContextMenu={e => {
                      this.handleClick(e, 'event2')
                    }}
                  >Try Event 2</Button>
                </ButtonGroup>
              </Col>
            </Row>
            {/* <ExampleMessage /> */}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const Menu = ( menus, type, onMenuClick, onClose)  => (
  <Popover id="custom-menu-basic">
    <Popover.Title as="h3">{type} Menu <span className='float-right cursor-pointer' onClick={onClose}><Icon icon={closeCircled} size={16} className='text-danger'/></span></Popover.Title>
    <Popover.Content>
      <ListGroup>
        {Array.isArray(menus) ?
          menus.map(
            (d, i) => <ListGroup.Item className='hoverable cursor-pointer' key={`${type}-menu-${i}`} onMenuClick={onMenuClick}>{d}</ListGroup.Item>
          ) : null
        }
      </ListGroup>
    </Popover.Content>
  </Popover>
)