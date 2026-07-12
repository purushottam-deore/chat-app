# Real-Time Chat Application

## Tech Stack

- React (Vite)
- Node.js
- Express
- Socket.io
- MongoDB

## Features

- Real-time messaging
- Chat history
- Username login
- Online users
- Typing indicator
- Message timestamps
- Responsive UI

## Project Structure

```
client/
server/
```

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=...
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## REST APIs

### GET

```
GET /api/messages
```

### POST

```
POST /api/messages
```

```json
{
  "username": "Alice",
  "message": "Hello"
}
```

## Socket Events

### Client → Server

- join
- sendMessage
- typing
- stopTyping

### Server → Client

- receiveMessage
- onlineUsers
- typing
- stopTyping

## Deployment

Frontend: Vercel

Backend: Render

## Design Decisions

- Socket.io for real-time communication.
- MongoDB for persistent message storage.
- REST APIs for fetching and storing chat history.

## Assumptions

- Dummy username-based login.
- Single global chat room.
