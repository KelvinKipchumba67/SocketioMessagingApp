import React from 'react';
import { UserList } from './UserList';
import { MessageWindow } from './MessageWindow';
import { MessageInput } from './MessageInput';
import './Chat.css';

export const Chat = () => {
  return (
    <div className="chat-container">
      <UserList />
      <div className="chat-main">
        <MessageWindow />
        <MessageInput />
      </div>
    </div>
  );
};