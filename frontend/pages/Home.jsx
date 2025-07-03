import React from "react";
import "../styles/styles.css";
import "../styles/battleshipImage.css";

export default function Home() {
  return (
    <>
      <div>
        <h1>Battleship</h1>
        <img id="battleshipImg" className="pic" src="/battleship.jpg" alt="BattleshipArt" />
      </div>
    </>
  );
}
