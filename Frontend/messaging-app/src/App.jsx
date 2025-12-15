import React, { useState } from 'react';
import { useSocketContext } from './SocketContext';
import { JoinChat } from './components/JoinChat';
import { Chat } from './components/Chat';
import './App.css';

function App() {
  const { isConnected } = useSocketContext();
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header__left">
          <h1 className="app-title">Socket.io Messaging</h1>
          <p className="app-subtitle">Real-time chat with Socket.io + React</p>
        </div>
      </header>
      {!isJoined ? (
        <JoinChat onJoined={() => setIsJoined(true)} />
      ) : (
        <Chat />
      )}
      <p className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
      </p>
    </div>
  );
}

export default App;