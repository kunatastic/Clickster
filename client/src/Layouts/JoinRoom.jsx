import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { clientConstants } from "../Constants/Socket";
import { SocketContext } from "../Context/Socket";
// Made by Yago Estévez (Twitter: @yagoestevez.com)

/***********************
  Nav Component
 ***********************/

const Nav = (props) => {
  return (
    <React.Fragment>
      <nav id="navbar">
        <div className="nav-wrapper">
          <p className="brand">
            <Link to="/">
              My
              <strong>Dumb</strong>
              Game
              <span className="color">.com</span>
            </Link>
          </p>
        </div>
      </nav>
    </React.Fragment>
  );
};

/***********************
  Header Component
 ***********************/

const Header = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const socket = useContext(SocketContext);
  const history = useHistory();

  const handler = (e) => {
    e.preventDefault();
    const payload = {
      name,
      room,
    };
    socket.emit(clientConstants.joinExistingRoom, payload);
    console.log(payload);

    history.replace(`/room/${room}`);
  };

  return (
    <header id="welcome-section">
      <div className="forest" />
      <div className="silhouette" />
      <div className="moon" />
      <div className="container form_container">
        <h1 className="roompage">
          Your friends can't wait for you? Join Fast plems
        </h1>
        <form>
          <input
            type="text"
            className="inputfield"
            value={name}
            placeholder="Username 🧑"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="inputfield"
            value={room}
            placeholder="Roomname 🏠"
            onChange={(e) => setRoom(e.target.value)}
          />
        </form>
        <div className="buttons">
          <button
            onClick={handler}
            type="submit"
            className=" button_link cta formsubmit"
          >
            Create
          </button>
        </div>
      </div>
    </header>
  );
};

/***********************
  Main Component
 ***********************/

export default function JoinRoom() {
  return (
    <>
      <Nav />
      <Header />
    </>
  );
}
