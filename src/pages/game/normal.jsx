import React from "react";
import "../../styles/styles.css";
import Board from "../../components/Board";
import Timer from "../../components/Timer";
import { TimeProvider } from "../../context/TimerContext";
// import Game from "../../components/Game";
// import { GameProvider } from "../../context/GameContext";

export default function NormalMode() {
  return (
    <>
    {/* <GameProvider> */}
    <TimeProvider>
      <div className="titleContainer">
        <h1>Normal Mode</h1>
        
      </div>
      <div className="gameContainer">
        <div className="timerContainer">
          <Timer></Timer>
        </div>
      {/* <Game></Game> */}
      <Board isAi={true}></Board>
      <Board isAi={false}></Board>
      </div>
      </TimeProvider>
      {/* </GameProvider> */}
      </>
  );
}