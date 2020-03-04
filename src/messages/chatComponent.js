import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChatInput from './ChatInput'
import ChatMessagesGroup from './ChatMessageGroup'

class ChatComponent extends Component {
    componentRef = React.createRef()
    onMessageSend = text => {
        this.props.onMessageSend(text)
        this.scrollToBottom()
    }
    scrollToBottom = () =>{
        this.componentRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    componentDidMount(){
        this.scrollToBottom()
    }
    componentDidUpdate(prevProps){
        const prevMsgs = prevProps.messages
        const msgs = this.props.messages
        if (Array.isArray(prevMsgs) && Array.isArray(msgs) && msgs.length !== prevMsgs.length){
            this.scrollToBottom()
        }
    }
    render() {
        const { messages, agentUser, iconSend, displayStop, onMessageStop, timeFormatter } = this.props
        return (
            <div className='container chat-component'>
                <div className='chat-messages-container row bg-light'>
                    <div className='col'>
                        <ChatMessagesGroup
                            messages={messages}
                            agentUser={agentUser}
                            timeFormatter={timeFormatter}
                        />
                    </div>
                </div>
                <div className='row chat-component-bottom'>
                    <div className='col'>
                        <ChatInput
                            iconSend={iconSend}
                            onMessageSend={text => this.onMessageSend(text)}
                            displayStop={displayStop}
                            onMessageStop={onMessageStop}
                        />
                    </div>
                    <div style={{ float: "left", clear: "both" }}>
                        <div ref={this.componentRef} />
                    </div>
                </div>
            </div>
        )
    }
}
ChatComponent.propTypes = {
    messages: PropTypes.array,
    agentUser: PropTypes.any,
    timeFormatter: PropTypes.func,
    iconSend: PropTypes.node,
    onMessageSend: PropTypes.func,
    displayStop: PropTypes.bool,
    onMessageStop: PropTypes.func
}

ChatComponent.defaultProps = {
    onMessageSend: (text) => null,
    onMessageStop: () => null,
    displayStop: true,
    timeFormatter: (time) => time
}
export default ChatComponent
