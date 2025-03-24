import React, { useState, useEffect } from "react";
import { useTimer } from "../context/TimerContext.jsx";
import Square from "./Square";
import "../styles/styles.css";
import "../styles/board.css";

function Board({ isAi }) {
  const DIMENSION = 10;

  const { gameStart, startGame } = useTimer();

  const boardTitle = isAi ? "Opponent's Board" : "Your Board";

  const boardClass = isAi ? "board" : "board notClickable"; // cant click own board

  const [board, setBoard] = useState([]); // set status when click square

  useEffect(() => {
    const newBoard = generateBoard();
    setBoard(newBoard);
  }, []);

  // ships
  const ships = [
    { size: 5, isHorizontal: Math.random() < 0.5 },
    { size: 4, isHorizontal: Math.random() < 0.5 },
    { size: 3, isHorizontal: Math.random() < 0.5 },
    { size: 3, isHorizontal: Math.random() < 0.5 },
    { size: 2, isHorizontal: Math.random() < 0.5 },
  ];

  // place ship, returns boolean
  function placeShip(board, r, c, length, isHorizontal) {
    const coords = [];

    for (let i = 0; i < length; i++) {
      const row = isHorizontal ? r : r + i;
      const col = isHorizontal ? c + i : c;

      if (row >= DIMENSION || col >= DIMENSION || board[row][col] !== "empty") {
        return false; // invalid ship location
      }

      coords.push([row, col]);
    }

    coords.forEach(([row, col]) => {
      board[row][col] = "ship";
    });

    return true;
  }

  // create board w/ random ship placement
  function generateBoard() {
    const newBoard = Array.from({ length: DIMENSION }, () =>
      Array(DIMENSION).fill("empty")
    );

    for (const ship of ships) {
      let placed = false;

      while (!placed) {
        const r = Math.floor(Math.random() * DIMENSION);
        const c = Math.floor(Math.random() * DIMENSION);

        placed = placeShip(newBoard, r, c, ship.size, ship.isHorizontal);
      }
    }

    return newBoard;
  }

  // update status on click
  const handleClick = (r, c) => {

    // start timer if it hasn't been already started
    if (!gameStart) {
      startGame();
    }

    const newBoard = board.map((row) => [...row]);
    const cell = newBoard[r][c];

    if (cell === "hit" || cell === "miss") return;

    newBoard[r][c] = cell === "ship" ? "hit" : "miss";

    setBoard(newBoard);
  };

  return (
    <>
      <h1> {boardTitle}</h1>
      <div className={boardClass}>
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <Square
              key={`${rIdx}-${cIdx}`}
              status={cell}
              isAi={isAi}
              onHit={() => handleClick(rIdx, cIdx)}
            />
          ))
        )}
      </div>
    </>
  );
}
export default Board