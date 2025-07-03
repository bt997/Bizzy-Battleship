function maskBoard(board) { 
    return board.map(row =>
      row.map(cell => {
        if (cell === "hit") return "hit";
        if (cell === "miss") return "miss";
        return "empty"; // converts ships to empty
      })
    );
  }
  
  // so boards have diff views on 2 computers
  export default function getMaskedGame(game, username) {
    const isP1 = (game.p1 === username);
  
    return {
      gameId: game._id,
      yourBoard: isP1 ? game.p1Board : game.p2Board, // full board
      opponentBoard: isP1 ? maskBoard(game.p2Board) : maskBoard(game.p1Board), // masked opponent board
      turn: game.turn,
      status: game.status,
      winner: game.winner,
      opponent: isP1 ? game.p2 : game.p1
    };
  }
  