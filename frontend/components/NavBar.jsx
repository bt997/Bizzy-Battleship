import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { useUser } from "../context/UserContext";
axios.defaults.withCredentials = true;

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  async function createGame() {
    try {
      const res = await axios.post("/api/game");
      const game = res.data;
      const gameId = game._id;
      navigate(`/game/${gameId}`);
    } catch (e) {
      console.error("Couldn't start game. " + e);
    }
  }

  async function logout() {
    try {
      await axios.delete("/api/user/logout");
      setUser(undefined);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  function loggedStatusButtons() {
    if (user === undefined) {
      return (
        <>
          <NavLink to="/login">
            {({ isActive }) => (
              <Button
                label="Log In"
                className={`button ${isActive ? "currPage" : ""}`}
              />
            )}
          </NavLink>
          <NavLink to="/register">
            {({ isActive }) => (
              <Button
                label="Sign Up"
                className={`button ${isActive ? "currPage" : ""}`}
              />
            )}
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <Button label="Log Out" className="button" onClick={logout} />

          <h1> Hi, {user}</h1>
        </>
      );
    }
  }

  function newGame() {
    if (user !== undefined) {
      return (
        <>
          <NavLink to="/game">
            {({ isActive }) => (
              <Button
                label="New Game"
                className="button"
                onClick={createGame}
              />
            )}
          </NavLink>{" "}
        </>
      );
    }
  }

  return (
    <nav className="navBar">
      <NavLink to="/" end>
        {({ isActive }) => (
          <Button
            label="Home"
            className={`button ${isActive ? "currPage" : ""}`}
          />
        )}
      </NavLink>

      {newGame()}

      <NavLink to="/rules">
        {({ isActive }) => (
          <Button
            label="Rules"
            className={`button ${isActive ? "currPage" : ""}`}
          />
        )}
      </NavLink>

      <NavLink to="/highscores">
        {({ isActive }) => (
          <Button
            label="High Scores"
            className={`button ${isActive ? "currPage" : ""}`}
          />
        )}
      </NavLink>

      <NavLink to="/games">
        {({ isActive }) => (
          <Button
            label="All Games"
            className={`button ${isActive ? "currPage" : ""}`}
          />
        )}
      </NavLink>

      {loggedStatusButtons()}
    </nav>
  );
}

export default Navbar;
