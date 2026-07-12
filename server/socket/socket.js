const users = new Map();

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // User joins
    socket.on("join", (username) => {
      users.set(socket.id, username);

      io.emit("onlineUsers", Array.from(users.values()));

      console.log(`${username} joined`);
    });

    // Send message
    socket.on("sendMessage", (message) => {
      io.emit("receiveMessage", message);
    });

    // Typing
    socket.on("typing", (username) => {
      socket.broadcast.emit("typing", username);
    });

    socket.on("stopTyping", () => {
      socket.broadcast.emit("stopTyping");
    });

    // Disconnect
    socket.on("disconnect", () => {
      users.delete(socket.id);

      io.emit("onlineUsers", Array.from(users.values()));

      console.log("User Disconnected");
    });
  });
}