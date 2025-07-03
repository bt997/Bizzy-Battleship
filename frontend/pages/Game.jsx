import React from "react";
import "../styles/styles.css";
import Board from "../components/Board";
import { GameProvider, useGame } from "../context/GameContext";
import { useUser } from "../context/UserContext";

export default function Game() {
  const { user } = useUser();

  function TurnPrompt() {
    const { isYourTurn, winner, opponentName, turn } = useGame();

    if (winner) return null;

    let message;
    if (user !== undefined) {
      message = isYourTurn ? "Your turn!" : `Waiting for ${opponentName}`;
    } else {
      message = `Waiting for ${turn}`;
    }

    return <h1 className="turnPrompt">{message}</h1>;
  }

  function WinnerAnnouncement() {
    const { winner } = useGame();
    if (!winner) return null;

    return <h1>Game Over: {winner} Wins!</h1>;
  }

  return (
    <GameProvider>
      <TurnPrompt />
      <WinnerAnnouncement />
      <div className="gameContainer">
        <Board isOpponent={true} />
        <Board isOpponent={false} />
      </div>
    </GameProvider>
  );
}
