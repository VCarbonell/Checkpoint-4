/* eslint-disable no-restricted-syntax */
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./src/app");
const messageController = require("./src/controllers/messageController");
const userController = require("./src/controllers/userController");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ` ${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    userController
      .putOne({
        params: {
          id: null,
        },
        body: {
          socket_id: null,
          isConnected: 0,
        },
        id: {
          socketID: socket.id,
        },
      })
      .then((result) => {
        if (result.affectedRows === 1) {
          io.emit("connexion", true);
        }
      })
      .catch((err) => console.error(err));
  });
  socket.on("connexion", (id) => {
    console.log(`User ${id} connected`);
    userController
      .putOne({
        params: {
          id,
        },
        body: {
          socket_id: socket.id,
          isConnected: 1,
        },
      })
      .then((result) => {
        if (result.affectedRows === 1) {
          io.emit("connexion", true);
        }
      })
      .catch((err) => console.error(err));
  });
  socket.on("message", (message) => {
    if (message) {
      messageController
        .postOne({
          body: message,
        })
        .then((res) => {
          if (res.affectedRows === 1) {
            io.emit("message", true);
          }
        })
        .catch((err) => console.error(err));
    } else {
      io.emit("message", true);
    }
  });
  socket.on("join", (id) => {
    io.emit("userjoin", id);
  });
  socket.on("leave", (id) => {
    io.emit("userleave", id);
  });
});

server.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});

io.listen(server);
