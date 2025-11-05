import React, { useState, useRef, useEffect } from 'react';
import { useSocketContext } from '../SocketContext';
import './MessageInput.css';

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, setTyping, typingUsers, socket, users } = useSocketContext();
  const typingTimeoutRef = useRef(null);

  const handleTyping = () => {
    if (!typingTimeoutRef.current) {
      setTyping(true);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      typingTimeoutRef.current = null;
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      setMessage('');
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const otherTypingUsers = typingUsers.filter(username => {
    const typingUser = users.find(u => u.username === username);
    return typingUser && typingUser.id !== socket.id;
  }).map(username => username);

  return (
    <div className="message-input-container">
      <div className="typing-indicator">
        {otherTypingUsers.length > 0 && (
          <em>
            {otherTypingUsers.join(', ')}
            {otherTypingUsers.length === 1 ? ' is' : ' are'} typing...
          </em>
        )}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
          className="message-input"
        />
        <button
          type="submit"
          className="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
};