import React from "react";
import { useGame } from "../context/GameContext.jsx";
import Square from "./Square";
import "../styles/styles.css";
import "../styles/board.css";
import { useUser } from "../context/UserContext.jsx";

function Board({ isOpponent }) {
  const { user } = useUser();
  const {
    yourBoard,
    opponentBoard,
    handleAttack,
    winner,
    isYourTurn,
    opponentName,
    p1,
    p2
  } = useGame();

  const board = isOpponent ? opponentBoard : yourBoard;

  let boardTitle;
  if (isOpponent) {
    boardTitle = `${opponentName}'s Board`;
  } else {
    if (user !== undefined) {
      boardTitle = "Your Board";
    } else {
      const owner = opponentName === p1 ? p2 : p1;
      boardTitle = `${owner}'s Board`;
    }
  }

  let boardClass = isOpponent ? "board" : "board notClickable";
  if (user === undefined) {
    boardClass = "board notClickable";
  }

  const handleClick = (r, c) => {
    if (!isOpponent || winner || !isYourTurn) return;
    handleAttack(r, c);
  };

  function maskUnloggedSquares(status) {
    if (user === undefined && status === "ship") {
      return "empty";
    }
    return status;
  }

  return (
    <>
      <h1>{boardTitle}</h1>
      <div className={boardClass}>
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <Square
              key={`${rIdx}-${cIdx}`}
              status={maskUnloggedSquares(cell)}
              isOpponent={isOpponent}
              onHit={() => handleClick(rIdx, cIdx)}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Board;
