import React, { useContext, useState } from "react";
import { clientConstants } from "../Constants/Socket";
import { SocketContext } from "../Context/Socket";
import { useLocation, useParams } from "react-router-dom";

export default function Score() {
  const [friends, setFriends] = useState([]);

  const { roomId } = useParams();

  const socket = useContext(SocketContext);

  socket.on(clientConstants.sendLeaderBoard, ({ points }) => {
    console.log(points);
    setFriends(points);
  });

  friends.sort((a, b) => b.score - a.score);
  return (
    <>
      <div className="score-section">
        <h2>Room name: {roomId}</h2>
        {console.log(roomId)}
        {/* <h2>Score: {3}</h2> */}
        LeaderBoard
        {friends.map((friend, key) => (
          <h3 key={key}>
            {friend.name} : {friend.score}
          </h3>
        ))}
      </div>
    </>
  );
}
