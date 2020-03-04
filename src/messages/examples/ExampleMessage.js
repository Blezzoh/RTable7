import React, {useState} from 'react'
import ChatComponent from '../index'
import { makeMessages, timeFormatter, addTextToMessageList } from './dataMsg'
import Icon from "react-icons-kit";
import { androidSend } from 'react-icons-kit/ionicons/androidSend'
import './boilerPlace.css'

export default () => {
    const [msgs, setMsg] = useState(makeMessages(20))
    return (
        <ChatComponent
            messages={msgs}
            agentUser={'Agent'}
            iconSend={<Icon icon={androidSend} size={15} />}
            onMessageSend={text => setMsg(addTextToMessageList(text, msgs))}
            timeFormatter={timeFormatter}
            displayStop={false}
            // onMessageStop={()=>null}
        />
    )
}
