const { serverConstants } = require("../Constants/Socket");
const { scores } = require("./Score");

// game leaderboard

const positionGenerator = () => {
  return `${Math.floor(Math.random() * 80)}%`;
};

var count = 0;

var activeUsers = [];
var activeRooms = [];

const preProcessLeaderBoard = (socket) => {
  const payload = [];

  // for (let i=0;i<socket.memberCount;i++){
  //   const temp =
  // }
};

const userJoiningRedunduntCode = (socket, name, room) => {
  socket["userName"] = name;
  socket["activeRoom"] = room;

  const payload = {
    socketId: socket.id,
    score: 0,
    name,
  };

  scores[room].players[socket.id] = payload;
  scores[room].memberCount++;
  socket.join(room);
  socket.registered = true;
  console.log(JSON.stringify(scores, null, 2));
};

const SocketLogic = (io) => {
  io.on(serverConstants.connection, (socket) => {
    // New user Connected
    activeUsers.push(socket.id);
    if (socket.registered === undefined) socket["registered"] = false;

    // Stats of the sockets
    // console.log("Active Users", activeUsers.length);
    // console.log("Active Rooms", activeRooms.length);
    console.log();
    console.log(JSON.stringify(scores, null, 2));
    console.log("Active rooms", activeRooms);
    console.log("Active users", activeUsers);
    console.log();

    // Creating a new Room
    socket.on(serverConstants.createNewRoom, ({ name, room }) => {
      // Same roomName exists
      if (activeRooms.indexOf(room) == -1) {
        // New room made
        activeRooms.push(room);
        scores[room] = {};
        scores[room].players = {};
        scores[room].memberCount = 0;
        userJoiningRedunduntCode(socket, name, room);
        console.log(activeRooms);

        // Emit success
        socket.emit(serverConstants.successRoomCreation, {
          error: false,
          msg: "Room created you are ready to go Enjoy",
          count: count++,
        });
        console.log(`${name} created and joined ${room}`);
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
        // console.log(activeRooms);

        // Emit success
        socket.emit(serverConstants.successRoomJoining, {
          error: false,
          msg: "Room joined you are ready to go Enjoy",
          count: count++,
        });
        console.log(`${name} joined ${room}`);
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
      activeUsers = activeUsers.filter((user) => user !== socket.id);
      if (!socket.registered) return;

      const roomName = socket["activeRoom"];
      console.log(roomName);

      socket[roomName].memberCount--;
      delete scores[roomName].players[socket.id];
      if (socket[roomName].memberCount == 0) {
        delete scores[roomName];
        activeRooms = activeRooms.filter((room) => room !== roomName);
      }
      // console.log("User disconnected", activeRooms, socket["userName"]);
      console.log(`${socket.userName} disconnected from ${roomName}`);
      console.log(JSON.stringify(scores, null, 2));

      socket.registered = false;
    });

    socket.on(serverConstants.winnerClicked, () => {
      console.log(`Winner is ${socket.userName} in room ${socket.activeRoom}`);
      io.of("/")
        .to(socket.activeRoom)
        .emit(serverConstants.sendGameLocation, {
          left: positionGenerator(),
          top: positionGenerator(),
          count: count++,
        });
    });
  });
};

module.exports = SocketLogic;
