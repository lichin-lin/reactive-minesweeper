import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Data
import { Game, SIZE, DIFFICULTY } from "./models";
const GameState = new Game(SIZE.EASY, DIFFICULTY.EASY);

ReactDOM.render(
  <React.StrictMode>
    <App gameState={GameState} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
