import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ChatInput = ({ iconSend, onMessageSend, displayStop, onMessageStop }) => {
    const textareaRef = React.createRef()
    const [text, setText] = useState('')
    const stopBtnClasses = displayStop ? "btn btn-danger chat-button-stop rounded-0" : "btn btn-danger chat-button-stop hidden"
    return (
        <div className="input-group chat-input-wrapper p-5 d-flex justify-content-end">
            <textarea ref={textareaRef} className="chat-input form-control border-primary rounded-0 border-top-0 border-right-0 border-left-0 border-bottom" aria-label="textarea message value" value={text} onChange={e => {
                setText(e.target.value)
            }} />
            <div className="input-group-append bg-light chat-button-wrapper p-3 rounded-0" >
                <button type="button" className="btn btn-outline-primary chat-button-send mr-3 rounded-0"
                    onClick={() => {
                        onMessageSend(text)
                        setText('')
                        textareaRef.current.focus()
                    }}
                    onKeyPress={e => {
                        if (e.keyCode === 13) {
                            onMessageSend(text)
                            setText('')
                            textareaRef.current.focus()
                        }
                    }}>
                    {iconSend}
                </button>
                <button type="button" className={stopBtnClasses} hidden={displayStop === false}
                    onClick={() => onMessageStop()}
                    onKeyPress={e => {
                        if (e.keyCode === 13) {
                            onMessageStop()
                            setText('')
                        }
                    }}
                >
                    stop
                </button>
            </div>
        </div>
    )
}

ChatInput.propTypes = {
    iconSend: PropTypes.node,
    onMessageSend: PropTypes.func,
    displayStop: PropTypes.bool,
    onMessageStop: PropTypes.func
}

ChatInput.defaultProps = {
    onMessageSend: (text) => null,
    onMessageStop: () => null,
    displayStop: true,
}
export default ChatInput