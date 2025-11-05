import React, { useState } from 'react';
import { useSocketContext } from '../SocketContext';
import './JoinChat.css';

export const JoinChat = ({ onJoined }) => {
  const [username, setUsername] = useState('');
  const { connect } = useSocketContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      connect(username.trim());
      onJoined();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="join-chat-form">
      <h3 className="join-chat-title">Join Chat</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
        className="join-chat-input"
      />
      <button type="submit" className="join-chat-button">
        Join
      </button>
    </form>
  );
};