import React, { useState } from 'react';
import { useSocketContext } from './SocketContext';
import { JoinChat } from './components/JoinChat';
import { Chat } from './components/Chat';

function App() {
  const { isConnected } = useSocketContext();
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="app-container">
      {!isJoined ? (
        <JoinChat onJoined={() => setIsJoined(true)} />
      ) : (
        <Chat />
      )}
      <p>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
    </div>
  );
}

export default App;