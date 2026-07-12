import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket/socket.js";
import connectDB from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-app-kappa-wheat-68.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
socketHandler(io);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-app-kappa-wheat-68.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});
