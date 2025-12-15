# Socket.io Messaging App

A real-time messaging application built with Socket.io, Node.js (Express), and React (Vite + Tailwind CSS).

## Features

- Real-time chat using Socket.io
- User join/leave notifications
- Multiple chat rooms (if implemented)
- Responsive UI with Tailwind CSS
- Simple and clean React frontend

## Project Structure

```
Backend/
  package.json
  src/
    server.js
    config/
    controllers/
    models/
    routes/
Frontend/
  messaging-app/
    package.json
    vite.config.js
    tailwind.config.js
    src/
      App.jsx
      main.jsx
      socket.js
      SocketContext.jsx
      components/
        Chat.jsx
        JoinChat.jsx
        MessageInput.jsx
        MessageWindow.jsx
        UserList.jsx
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
   The backend will run on the default port (e.g., 5000 or as set in your code).

### Frontend Setup

1. Navigate to the frontend app folder:
   ```sh
   cd Frontend/messaging-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

## Configuration

- Update backend and frontend connection URLs as needed (e.g., in `socket.js` or environment files).
- Tailwind CSS is used for styling. Adjust `tailwind.config.js` as needed.

## Scripts

- **Backend**
  - `npm start` — Start the Express server
- **Frontend**
  - `npm run dev` — Start Vite development server
  - `npm run build` — Build for production
  - `npm run preview` — Preview production build

## License

MIT

---
