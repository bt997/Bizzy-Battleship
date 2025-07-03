const DIMENSION = 10;

// function to gen player boards for use in game.api
export default function generateBoard() {
  const ships = [
    { size: 5, isHorizontal: Math.random() < 0.5 },
    { size: 4, isHorizontal: Math.random() < 0.5 },
    { size: 3, isHorizontal: Math.random() < 0.5 },
    { size: 3, isHorizontal: Math.random() < 0.5 },
    { size: 2, isHorizontal: Math.random() < 0.5 },
  ];

  const board = Array.from({ length: DIMENSION }, () =>
    Array(DIMENSION).fill("empty")
  );

  function placeShip(board, r, c, length, isHorizontal) {
    const coords = [];

    for (let i = 0; i < length; i++) {
      const row = isHorizontal ? r : r + i;
      const col = isHorizontal ? c + i : c;

      if (
        row >= DIMENSION ||
        col >= DIMENSION ||
        board[row][col] !== "empty"
      ) {
        return false; // invalid position
      }

      coords.push([row, col]);
    }

    coords.forEach(([row, col]) => {
      board[row][col] = "ship";
    });

    return true;
  }

  for (const ship of ships) {
    let placed = false;
    while (!placed) {
      const r = Math.floor(Math.random() * DIMENSION);
      const c = Math.floor(Math.random() * DIMENSION);
      placed = placeShip(board, r, c, ship.size, ship.isHorizontal);
    }
  }

  return board;
}


