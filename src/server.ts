import { connectSockets } from "./sockets/socket";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Dependencies
import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(morgan("common"));

// Connecting the socket.io to the nodejs server
connectSockets(app);

// Server listening
const PORT = process.env.NODE_APP_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
