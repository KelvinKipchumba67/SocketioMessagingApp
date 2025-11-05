import React, { useEffect, useState, useRef } from 'react';
import { useSocketContext } from '../SocketContext';
import './MessageWindow.css';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const MessageWindow = () => {
  const { messages, setMessages, socket } = useSocketContext();
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const response = await fetch(`${SOCKET_URL}/api/messages`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
      setIsLoading(false);
    };
    fetchInitialMessages();
  }, [setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) return <p className="loading-message">Loading messages...</p>;

  return (
    <div className="message-window">
      {messages.map((msg) => {
        const isMyMessage = msg.senderId === socket.id;
        const messageClass = msg.system
          ? 'message system'
          : `message ${isMyMessage ? 'my-message' : 'other-message'}`;

        return (
          <div key={msg.id} className={messageClass}>
            {msg.system ? (
              <em>{msg.message}</em>
            ) : (
              <>
                {!isMyMessage && <strong className="sender-name">{msg.sender}</strong>}
                <span>{msg.message}</span>
                <small className="message-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</small>
              </>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};