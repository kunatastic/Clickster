import React from "react";

export default function Button() {
  const run = () => {
    console.log("clicked");
  };
  return (
    <button className="hero" onClick={run}>
      PUNISH ME
    </button>
  );
}
