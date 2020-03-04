## React-bootstrap-chat-ui 

This is a component that provides the basic view for a chat ui: chat messages and time of sending, and a input to send a new chat message.

It also has a message class that creates a basic object for a message: it contains the message id, user, body, and time.

### 1. Usage

This package contains 4 components. Three of those component that can be imported independently: ChatInput, SingleChat, and ChatMessagesGroup. The forth one, ChatComponent, uses the previous three to make a full chat component.

You can use the indepent components to make your own chat ui, or use the already put together ChatComponent.

**A. ChatComponent**

This is the default component in this package.it can be imported like this:

``` 
import ChatComponent from 'react-bootstrap-chat-ui'
```

* It provides a container to display the messages in a bootstrap container
* It contains at the bottom a textarea to compose a new chat message
* When new messages are received, it scrolls at the bottom the chat thread


***PropTypes***

``` 
ChatComponent.propTypes = {
    // array of message object, each containing at the keys displayed.
    messages: PropTypes.arrayOf(
        PropTypes.shape({
        body: PropTypes.string,
        id: PropTypes.any,
        time: PropTypes.string,
        user: PropTypes.string
        })
    ),

    // id of the user who is using the view i.e the user displayed at the right of the chat conversation
    agentUser: PropTypes.any,

    // function to format the message time to be displayed in the correct format
    timeFormatter: PropTypes.func,
   
     // icon to be used on the send button, can be a text or a node
    iconSend: PropTypes.node, 
    
    // function used to send a message. it takes the text in the input as an argument
    // triggered by a click event or an enter event
    onMessageSend: PropTypes.func,

    // boolean to indicate if the stop button should be displayed. By default it is true
    displayStop: PropTypes.bool,

    // function to stop a chat. receives no argument
    onMessageStop: PropTypes.func
}

ChatComponent.defaultProps = {
    onMessageSend: (text) => null,
    onMessageStop: () => null,
    displayStop: true,
    timeFormatter: (time) => time
}
```

**B. ChatInput**

A ChatInput is the input where a user can send a new chat message.

***PropTypes***

``` 
ChatInput.propTypes = {
    // icon to be used on the send button, can be a text or a node
    iconSend: PropTypes.node, 
    
    // function used to send a message. it takes the text in the input as an argument
    // triggered by a click event or an enter event
    onMessageSend: PropTypes.func,

    // boolean to indicate if the stop button should be displayed. By default it is true
    displayStop: PropTypes.bool,

    // function to stop a chat. receives no argument
    onMessageStop: PropTypes.func
}
```

**C. SingleChat**

This is view that display a single message chat. It display this at the right if the user is the the agent user, other wise to the left. It displays also the time when the message was sent or received.

***PropTypes***

```
SingleChat.propTypes ={
    message: PropTypes.shape({
        body: PropTypes.string,
        id: PropTypes.any,
        time: PropTypes.string,
        user: PropTypes.string
    }),
    left: PropTypes.bool,
    //depending on your time format you might need this. Not required
    timeFormatter: PropTypes.func
}
```

**D. ChatMessagesGroup**

This is component display a list of SingleChats. 

***PropTypes***

```
ChatMessagesGroup.propTypes ={
    messages: PropTypes.array,
    agentUser: PropTypes.any,
    timeFormatter: PropTypes.func
}
```

### 2. Example

In the example folder there is an example of the chat component in use. There is also a css boiler plate, just in case the user wants to change style the component differently.
