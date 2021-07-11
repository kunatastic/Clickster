const { serverConstants } = require("./Constants/Socket");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

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

var activeRooms = {};
var activeUsers = [];

io.on(serverConstants.connection, (socket) => {
  activeUsers.push(socket.id);
  // console.log("new user logged in", socket.id);
  console.log("User connected", activeUsers.length);
  socket["activeRoom"] = [];
  // console.log(socket.rooms);

  socket.on(serverConstants.createNewRoom, ({ name, room }) => {
    socket.join(room);

    socket["userName"] = name;
    socket["activeRoom"].push(room);

    activeRooms[room] = {
      creator: name,
      members: [name],
    };

    console.log(socket.rooms);
  });

  socket.on(serverConstants.joinExistingRoom, ({ name, room }) => {
    socket.join(room);
    socket["userName"] = name;
    socket["activeRoom"].push(room);
    activeRooms[room].members.push(name);
    console.log(activeRooms);
  });
  socket.on(serverConstants.disconnect, () => {
    for (let i = 0; i < socket["activeRoom"].length; i++) {
      const roomName = socket["activeRoom"][i];
      console.log(roomName);
      activeRooms[roomName].members = activeRooms[roomName].members.filter(
        (e) => e !== socket["userName"]
      );

      if (activeRooms[roomName].members.length === 0) {
        delete activeRooms[roomName];
      }
    }
    activeUsers = activeUsers.filter((user) => user !== socket.id);
    console.log("User disconnected", activeRooms, socket["userName"]);
  });
});

const PORT = process.env.PORT || 5001;
http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
