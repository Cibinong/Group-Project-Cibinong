const app = require("./app");
const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  socket.on("join-chat", ({ AuthorId }) => {
    if (!rooms.has(AuthorId)) {
      rooms.set(AuthorId, [socket]);
      socket.join('room ' + AuthorId);
      console.log(`${AuthorId} joined `);
    } else {
      const occupants = rooms.get(AuthorId);
      if (occupants.length >= 2) {
        socket.emit("room-full", { message: "Room is already full." });
        return;
      }
      occupants.push(socket);
      rooms.set(AuthorId, occupants);
      socket.join('room ' + AuthorId);
    }
  });

  socket.on("message:create", ({ message, chat }) => {
    io.to(chat).emit("message:delivered", message);
  });

  socket.on("disconnect", () => {
    rooms.forEach((value, key) => {
      const index = value.indexOf(socket);
      if (index !== -1) {
        value.splice(index, 1);
        if (value.length === 0) {
          rooms.delete(key);
        } else {
          rooms.set(key, value);
        }
      }
    });
  });
});

module.exports = { io, server };
