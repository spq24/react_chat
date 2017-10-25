import PropTypes from 'prop-types';
import React from 'react';
import MessagesList from './MessagesList'
import update from 'immutability-helper'
import MessageForm from './MessageForm'

export default class Chatroom extends React.Component {
  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);
    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    let chatroom = JSON.parse(this.props.chatroom)
    this.state = {
      messages: chatroom.messages,
      chatroomId: chatroom.id
    }
  }

  updateName = (name) => {
    this.setState({ name });
  };

  updateMessages(message) {
    const messages = update(this.state.messages,
                      {$push: [message]}
                    )
    this.setState({messages: messages})
  }

  componentDidMount() {
    App.chatroom = App.cable.subscriptions.create({
      channel: "ChatroomChannel",
      id: this.state.chatroomId
      },
      {
        received: function(data) {
          this.updateMessages(JSON.parse(data.message))
        }.bind(this)
    });
  }

  componentDidUpdate() {
    document.getElementById('messagesBottom').scrollIntoView()
  }

  render() {
    return (
      <div>
        <MessagesList messages={this.state.messages} />
        <MessageForm chatroomId={this.state.chatroomId} />
      </div>
    );
  }
}
