import React from 'react';
import { UserList } from './UserList';
import { MessageWindow } from './MessageWindow';
import { MessageInput } from './MessageInput';

export const Chat = () => {
  return (
    <div className="flex h-[80vh] bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <UserList />
      <div className="flex flex-col flex-1">
        <MessageWindow />
        <MessageInput />
      </div>
    </div>
  );
};