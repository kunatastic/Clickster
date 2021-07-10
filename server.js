const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

// game leaderboard

var scores = [
  {
    roomId: "1grjei",
    maxPlayer: 3,
    players: [
      {
        socketId: "iogjere8949htg",
        name: "kunal",
        score: 12,
      },
      {
        socketId: "iogjere8949htg",
        name: "kunal",
        score: 12,
      },
    ],
  },
];

io.on("connection", (socket) => {
  console.log("new user logged in", socket.id);

  console.log(socket.rooms);

  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});


const PORT = process.env.PORT || 5001;
http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
