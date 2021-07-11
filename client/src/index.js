import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { SocketContext, socket } from "./Context/Socket";

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <App />
  </SocketContext.Provider>,
  document.getElementById("root")
);
