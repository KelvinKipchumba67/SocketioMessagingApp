import React from 'react';
import { useSocketContext } from '../SocketContext';
import './UserList.css';

export const UserList = () => {
  const { users, socket } = useSocketContext();

  return (
    <div className="user-list">
      <h3>
        Online Users ({users.length})
      </h3>
      <ul className="users-container">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            {user.username}
            {user.id === socket.id && <span className="you-indicator"> (You)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};