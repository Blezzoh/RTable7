import React from 'react'
import PropTypes from 'prop-types'
import SingleChat from './SingleChat'


const ChatMessagesGroup = ({messages = [], agentUser, timeFormatter}) =>{
    if(Array.isArray(messages)){
        return(
            <div className='chat-message-list'>
                {
                    messages.map(
                        (d,i) =><SingleChat message={d} left={d.user !== agentUser} timeFormatter={timeFormatter} /> 
                    )
                }
            </div>
        )
    }
    return null
}

ChatMessagesGroup.propTypes ={
    messages: PropTypes.array,
    agentUser: PropTypes.any,
    timeFormatter: PropTypes.func
}

export default ChatMessagesGroup