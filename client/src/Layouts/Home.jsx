import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/create">Create a new Room</Link>
      <br />
      <Link to="/join">Join a Room</Link>
    </div>
  );
}
