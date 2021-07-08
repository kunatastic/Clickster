"use strict";
if (process.env) {
}
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var cors = require("cors");
var morgan = require("morgan");
var app = express();
var server = http.createServer(app);
var io = socketio(server);
// Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("common"));
var PORT = process.env.NODE_APP_PORT || 5001;
app.listen(PORT, function () {
  console.log("Listening at http://localhost:" + PORT);
});
