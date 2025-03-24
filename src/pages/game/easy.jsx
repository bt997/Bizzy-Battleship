import React from "react";
import "../../styles/styles.css";
import Board from "../../components/Board";
import Button from "../../components/Button";
import Timer from "../../components/Timer";
import { NavLink } from "react-router-dom";
import { TimeProvider } from "../../context/TimerContext";


export default function EasyMode() {
  return (
    <>
    <TimeProvider>
      <NavLink to="/game/easy">
        </NavLink>
      <div className="titleContainer">
        <h1>Easy Mode</h1>
      </div>
      <div className="gameContainer">
        <div className="timerContainer">
          <Timer></Timer>
        </div>
        <Board isAi={true}></Board>
      </div>
    </TimeProvider>
    </>
  );
}
