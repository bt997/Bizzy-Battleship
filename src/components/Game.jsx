import React from "react";
import Board from "./Board";
import { useGame } from "../context/GameContext.jsx";
import "../styles/styles.css";
import Button from "./Button";

function Game() {  // handle normal mode together
    
    const { playerTurn, winner, aiTurn} = useGame();

    function handleReset() {

    }

    return (
        <div className="gameContainer">
            <Board isAi={true}></Board>
            <Board isAi={false}></Board>
        </div>
    );
} 

export default Game