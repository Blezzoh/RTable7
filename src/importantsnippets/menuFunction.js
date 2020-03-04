

const Menu = (menus, type, onMenuClick, onClose) => (
    <Popover id="custom-menu-basic">
        <Popover.Title as="h3">{type} Menu <span className='float-right cursor-pointer' onClick={onClose}><Icon icon={closeCircled} size={16} className='text-danger' /></span></Popover.Title>
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

const workThroughSome = ({ }) => {
    return (
        <div>
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
                {Menu(this.state.menuLeft, 'Phone', undefined, () => this.handleClose('menuEvent1'))}
            </Overlay>
        </div>
    )
}

class some {
    handleClose(menuName) {
        this.setState({ [menuName]: false })
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
}