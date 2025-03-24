import React from "react";
import "../styles/styles.css";
import "../styles/battleshipImage.css";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  return (
    <>
      <div>
        <h1>Battleship</h1>
        <img id="battleshipImg" className="pic" src="/battleship.jpg" alt="BattleshipArt" />
      </div>

      {/* Links to game modes */}
      <div>
        <nav id="gameModes" className="navBar">
          <NavLink to="/game/easy">
            <Button className="button" label="Easy Mode" />
          </NavLink>

          <NavLink to="/game/normal">
            <Button className="button" label="Normal Mode" />
          </NavLink>
        </nav>
      </div>
    </>
  );
}
