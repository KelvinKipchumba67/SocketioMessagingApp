import React, { useEffect, useState, useRef } from 'react';
import { useSocketContext } from '../SocketContext';

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

  if (isLoading) return <p className="p-4">Loading messages...</p>;

  return (
    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
      {messages.map((msg) => {
        const isMyMessage = msg.senderId === socket.id;
        
        // Define base classes
        let messageClasses = "p-3 rounded-lg max-w-xs";
        
        if (msg.system) {
          messageClasses = "w-full text-center text-gray-500 text-sm italic";
        } else if (isMyMessage) {
          messageClasses += " bg-blue-600 text-white self-end";
        } else {
          messageClasses += " bg-gray-700 text-gray-200 self-start";
        }

        return (
          <div key={msg.id} className={messageClasses}>
            {msg.system ? (
              <em>{msg.message}</em>
            ) : (
              <>
                {!isMyMessage && <strong className="block font-medium">{msg.sender}</strong>}
                <span>{msg.message}</span>
                <small className="text-xs text-gray-400 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</small>
              </>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};