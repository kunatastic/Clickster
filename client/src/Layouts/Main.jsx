import React from "react";
import Asset from "../Components/Button";
import Score from "../Components/Score";
// Made by Yago Estévez (Twitter: @yagoestevez.com)

/***********************
  Nav Component
 ***********************/

const Nav = (props) => {
  return (
    <React.Fragment>
      <nav id="navbar">
        <div className="nav-wrapper disable">
          <p className="brand ">
            My
            <strong>Dumb</strong>
            Game
            <span className="color">.com</span>
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
    <div className="heart">
      <header id="welcome-section">
        <Score />
        <Asset />
        <Asset />
        <Asset />
        <Asset />
      </header>
    </div>
  );
};

/***********************
  Main Component
 ***********************/

export default function Main() {
  return (
    <>
      <Nav />
      <Header />
    </>
  );
}
