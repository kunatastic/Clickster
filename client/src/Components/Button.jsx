import React, { useState } from "react";

export default function Button() {
  const [topp, setTopp] = useState("79%");
  const [leftp, setLeftp] = useState("79%");

  const run = () => {
    setLeftp(`${Math.floor(Math.random() * 80)}%`);
    setTopp(`${Math.floor(Math.random() * 80)}%`);
  };

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
