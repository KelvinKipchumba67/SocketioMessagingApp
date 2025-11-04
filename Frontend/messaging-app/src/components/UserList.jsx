import React from 'react';
import { useSocketContext } from '../SocketContext';

export const UserList = () => {
  const { users, socket } = useSocketContext();

  return (
    <div className="w-1/4 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-300 mb-3">
        Online Users ({users.length})
      </h3>
      <ul className="flex flex-col gap-2">
        {users.map((user) => (
          <li key={user.id} className="text-gray-400 p-2 rounded-md truncate">
            {user.username}
            {user.id === socket.id && <span className="text-blue-400 text-sm"> (You)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};