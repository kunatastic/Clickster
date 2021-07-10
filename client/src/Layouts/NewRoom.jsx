import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
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

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000");
    setRoom(generateRandom());
    return () => socketRef.current.disconnect();
  }, []);

  const handler = (e) => {
    e.preventDefault();
    const payload = {
      name,
      room,
    };
    socketRef.current.emit("join", payload);
    console.log(payload);
  };

  return (
    <header id="welcome-section">
      <div className="forest" />
      <div className="silhouette" />
      <div className="moon" />
      <div className="container form_container">
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
            className=" buttons button_link cta formsubmit"
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

export default function Home() {
  return (
    <>
      <Nav />
      <Header />
    </>
  );
}
