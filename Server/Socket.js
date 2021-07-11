const { serverConstants } = require("./Constants/Socket");

// game leaderboard

var scores = {
  roomId: {
    players: {
      gwjigwjo: {
        socketId: "iogjere8949htg",
        name: "Kunal",
        score: 12,
      },
      gewij: {
        socketId: "iogjere8949htg",
        name: "Kunal1",
        score: 12,
      },
    },
  },
};

const positionGenerator = () => {
  return `${Math.floor(Math.random() * 80)}%`;
};

var count = 0;

var activeUsers = [];
var activeRooms = [];

const userJoiningRedunduntCode = (socket, name, room) => {
  socket["userName"] = name;
  socket["activeRoom"].push(room);
  const socketID = socket.id;
  scores[room] = {
    players: { socketID: { socketId: socket.id, score: 0, name } },
  };
  socket.join(room);
};

const SocketLogic = (io) => {
  io.on(serverConstants.connection, (socket) => {
    // New user Connected
    socket["activeRoom"] = [];
    activeUsers.push(socket.id);

    // Stats of the sockets
    console.log("Active Users", activeUsers.length);
    console.log("Active Rooms", activeRooms.length);
    console.log(scores);

    // Creating a new Room
    socket.on(serverConstants.createNewRoom, ({ name, room }) => {
      // Same roomName exists
      if (activeRooms.indexOf(room) == -1) {
        // New room made
        activeRooms.push(room);
        userJoiningRedunduntCode(socket, name, room);
        console.log(activeRooms);

        // Emit success
        socket.emit(serverConstants.successRoomCreation, {
          error: false,
          msg: "Room created you are ready to go Enjoy",
          count: count++,
        });
      } else {
        // Emit Error
        socket.emit(serverConstants.errorRoomCreation, {
          error: true,
          msg: "Room Name already exists use another room name",
          count: count++,
        });
        console.log("Creating room error");
      }
    });

    socket.on(serverConstants.joinExistingRoom, ({ name, room }) => {
      // If room already exists
      if (activeRooms.indexOf(room) != -1) {
        userJoiningRedunduntCode(socket, name, room);
        console.log(activeRooms);

        // Emit success
        socket.emit(serverConstants.successRoomJoining, {
          error: false,
          msg: "Room joined you are ready to go Enjoy",
          count: count++,
        });
      } else {
        socket.emit(serverConstants.errorRoomJoining, {
          error: true,
          msg: "Room Name doesnot exists try name properly or make a new room",
          count: count++,
        });
        console.log("Joining room error");
      }
    });

    socket.on(serverConstants.disconnect, () => {
      for (let i = 0; i < socket["activeRoom"].length; i++) {
        const roomName = socket["activeRoom"][i];
        console.log(roomName);
        scores[roomName].players = scores[roomName].players.filter(
          (e) => e.socketId !== socket.id
        );
        if (scores[roomName].players.length === 0) {
          delete scores[roomName];
          activeRooms = activeRooms.filter((room) => room !== roomName);
        }
      }
      activeUsers = activeUsers.filter((user) => user !== socket.id);
      console.log("User disconnected", activeRooms, socket["userName"]);
    });

    socket
      .to(socket["room"])
      .on(serverConstants.sendGameLocation, {
        left: positionGenerator(),
        right: positionGenerator(),
      });
  });
};

module.exports = SocketLogic;
