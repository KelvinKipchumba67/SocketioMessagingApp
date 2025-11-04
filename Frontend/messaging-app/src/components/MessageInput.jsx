import React, { useState, useRef, useEffect } from 'react';
import { useSocketContext } from '../SocketContext';

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
    <div className="p-4 bg-gray-800 border-t border-gray-700">
      <div className="h-5 text-sm text-gray-400 italic mb-1">
        {otherTypingUsers.length > 0 && (
          <em>
            {otherTypingUsers.join(', ')}
            {otherTypingUsers.length === 1 ? ' is' : ' are'} typing...
          </em>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-3 px-5 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};