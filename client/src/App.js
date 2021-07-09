import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Layouts/Home";
import NewRoom from "./Layouts/NewRoom";
import JoinRoom from "./Layouts/JoinRoom";
import Main from "./Layouts/Main";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" component={NewRoom} />
          <Route path="/join" component={JoinRoom} />
          <Route path="/room/:roomId" component={Main} />
          <Route>404</Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
