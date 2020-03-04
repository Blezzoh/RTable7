import React from 'react'
import PropTypes from 'prop-types'

const SingleChat = ({ message, left, timeFormatter }) => {
    let {body, time } = message
    const rightSpanClass = left ? 'hidden ml-2' : 'ml-2 single-chat-time'
    const leftSpanClass = left ? 'mr-2 single-chat-time' : 'hidden mr-2'
    const upperClass = left? 'single-chat  d-flex justify-content-start mb-2' : 'single-chat d-flex justify-content-end mb-2'
    const bodyClass = left?'bg-secondary text-white p-2 w-50 single-chat-text rounded text-left ' : 'bg-primary text-white  p-2 w-50 single-chat-text rounded text-left'
    time = timeFormatter(time)
    return (
        <div className={upperClass}>
            <span className={leftSpanClass} hidden={!left}>{time}</span><span className={bodyClass}>{body}</span><span className={rightSpanClass} hidden={left}>{time}</span>
        </div>
    )
}


SingleChat.propTypes ={
    message: PropTypes.shape({
        body: PropTypes.string,
        id: PropTypes.any,
        time: PropTypes.string,
        user: PropTypes.string
    }),
    left: PropTypes.bool,
    //depending on your time format you might need this
    timeFormatter: PropTypes.func
}

SingleChat.defaultProps ={
    timeFormatter: (time) => time
}
export default SingleChat