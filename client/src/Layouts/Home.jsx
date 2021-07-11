import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <div className="home">
      <header id="welcome-section">
        <div className="forest" />
        <div className="silhouette" />
        <div className="moon" />
        <div className="container">
          <h1 className="herotext">
            <span className="line">Are you as </span>
            <span className="line">
              bored as I am <span className="color">?</span>
            </span>
            <span className="line">
              <span className="color">Maybe</span> a game.
            </span>
          </h1>
          <div className="buttons">
            <Link to="/create" className="button_link">
              Create a new Room
            </Link>
            <Link to="/join" className="cta button_link">
              Join a Room
            </Link>
          </div>
        </div>
      </header>
    </div>
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
