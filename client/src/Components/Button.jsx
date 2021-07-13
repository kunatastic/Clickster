import React, { useContext, useState } from "react";
import { clientConstants } from "../Constants/Socket";
import { SocketContext } from "../Context/Socket";

export default function Button() {
  const [topp, setTopp] = useState("79%");
  const [leftp, setLeftp] = useState("79%");

  const socket = useContext(SocketContext);

  const run = () => {
    socket.emit(clientConstants.winnerClicked);
  };

  socket.on(clientConstants.sendGameLocation, ({ left, top }) => {
    setLeftp(left);
    setTopp(top);
  });

  const style4Game = {
    top: topp,
    left: leftp,
  };

  return (
    <button className="hero" style={style4Game} onClick={run}>
      PUNISH ME
    </button>
  );
}
