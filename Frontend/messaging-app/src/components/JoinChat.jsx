import React, { useState } from 'react';
import { useSocketContext } from '../SocketContext';

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
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-20 flex flex-col gap-4"
    >
      <h3 className="text-xl font-semibold text-center">Join Chat</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
        className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full p-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
      >
        Join
      </button>
    </form>
  );
};