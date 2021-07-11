const SocketLogic = require("./Socket");

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

SocketLogic(io);

const PORT = process.env.PORT || 5001;
http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
