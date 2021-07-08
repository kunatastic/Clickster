const { Socket, Server } = require("socket.io");

enum clientEvents {
  CONNECTION = "connection",
}

enum serverEvents {
  CONNECTION = "connection",
}
