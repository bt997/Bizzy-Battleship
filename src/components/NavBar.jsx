import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  return (
    <nav className="navBar">
      <NavLink to="/">
        {({ isActive }) => (
          <Button
            label="Home"
            className="button"
            id={isActive ? "currPage" : ""}
          />
        )}
      </NavLink>

      <NavLink to="/game/easy">
        {({ isActive }) => (
          <Button
            label="Easy"
            className="button"
            id={isActive ? "currPage" : ""}
          />
        )}
      </NavLink>

      <NavLink to="/game/normal">
        {({ isActive }) => (
          <Button
            label="Normal"
            className="button"
            id={isActive ? "currPage" : ""}
          />
        )}
      </NavLink>

      <NavLink to="/rules">
        {({ isActive }) => (
          <Button
            label="Rules"
            className="button"
            id={isActive ? "currPage" : ""}
          />
        )}
      </NavLink>

      <NavLink to="/highscores">
        {({ isActive }) => (
          <Button
            label="High Scores"
            className="button"
            id={isActive ? "currPage" : ""}
          />
        )}
      </NavLink>
    </nav>
  );
}

export default Navbar;
