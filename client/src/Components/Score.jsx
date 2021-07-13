import React from "react";

export default function Score() {
  const friends = [
    { name: "Kunal1", score: 300 },
    { name: "Kunal2", score: 35 },
    { name: "you", score: 50 },
  ];
  friends.sort((a, b) => b.score - a.score);
  return (
    <>
      <div className="score-section">
        <h2>RoomId: {32}</h2>
        <h2>Score: {3}</h2>
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
