// makes  states (like messages, user and functions like sendMessage available to the entire app

import React, { createContext, useContext } from 'react';
import { useSocket } from './socket'; // Your hook

// 1. Create the context
const SocketContext = createContext();

// 2. Create a "hook" to easily use the context
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// 3. Create the Provider component
export const SocketProvider = ({ children }) => {
  const socketData = useSocket(); // Your hook provides all the data

  return (
    <SocketContext.Provider value={socketData}>
      {children}
    </SocketContext.Provider>
  );
};