import React, { useContext, useEffect, useState } from "react";
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

//a function to generate random string
const generateRandom = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const Header = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const socket = useContext(SocketContext);
  const history = useHistory();

  useEffect(() => {
    setRoom(generateRandom());
  }, [socket]);

  const handler = (e) => {
    e.preventDefault();
    const payload = {
      name,
      room,
    };
    socket.emit(clientConstants.createNewRoom, payload);
    console.log(payload);
  };

  socket.on(clientConstants.errorRoomCreation, (data) => {
    console.log(data);
  });

  socket.on(clientConstants.successRoomCreation, (data) => {
    console.log(data);
    history.replace(`/room/${room}`);
  });

  return (
    <div className="create">
      <header id="welcome-section">
        <div className="forest" />
        <div className="silhouette" />
        <div className="moon" />
        <div className="container form_container">
          <h1 className="roompage">
            Create a new room and invite you friends to play with you!
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
    </div>
  );
};

/***********************
  Main Component
 ***********************/

export default function NewRoom() {
  return (
    <>
      <Nav />
      <Header />
    </>
  );
}
