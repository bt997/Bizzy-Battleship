import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {

    const [playerTurn, setPlayerTurn] = useState(true); // player always goes first
    
    const [winner, setWinner] = useState(null);

    const [aiTurn, setAiTurn] = useState(false);

    const switchTurn = () => {
        setPlayerTurn(!playerTurn);
        setAiTurn(!aiTurn)
    };


    const checkForWinner = (board) => {
        return board.every((row) => row.every((cell) => cell !== "ship"));
    };

    const newBoard = board.map((row) => [...row]);
    const cell = newBoard[r][c];

    const handleAttack = (board, setBoard, r, c) => {
        if (cell === "hit" || cell === "miss") {
            return;
        }

        newBoard[r][c] = board[r][c] === "ship" ? "hit" : "miss";

        setBoard(newBoard);
    
        if (checkForWinner(newBoard)) {
            setWinner(playerTurn ? "You" : "Opponent");
        } else {
            switchTurn();
        }
    };

    const aiMove = () => {
        if (!playerTurn && !winner) {
            let r, c;
            do {
                r = Math.floor(Math.random() * 10);
                c = Math.floor(Math.random() * 10);
            } while (playerBoard[r][c] === "hit" || playerBoard[r][c] === "miss");

        handleAttack(playerBoard, setPlayerBoard, r, c);
        }
    };

    const value = {
        playerTurn,
        playerBoard,
        aiBoard,
        winner,
        setPlayerBoard,
        setAiBoard,
        handleAttack,
        aiMove
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
  }