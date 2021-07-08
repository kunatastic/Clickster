import http from "http";
import socket from "socket.io";

// export const connectSockets = (server: http.Server) => {
export const connectSockets = (app: Express.Application) => {
  const server = http.createServer(app);
  const io = (socket as any)(server);

  io.on('connection',()=>{
    
  })

  console.log("Sockets connected");
};
