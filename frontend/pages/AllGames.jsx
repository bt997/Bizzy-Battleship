import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AllGames() {
  const { user } = useUser();
  const navigate = useNavigate();

  // logged in info
  const [otherOpenGames, setOtherOpenGames] = useState([]);
  const [myOpenGames, setMyOpenGames] = useState([]);
  const [myActiveGames, setMyActiveGames] = useState([]);
  const [myCompletedGames, setMyCompletedGames] = useState([]);
  const [otherGames, setOtherGames] = useState([]);

  // not logged in info
  const [activeGames, setActiveGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);

  useEffect(
    function () {
      // logged in retrieval
      retrieveOtherOpenGames();
      retrieveMyOpenGames();
      retrieveMyActiveGames();
      retrieveMyCompletedGames();
      retrieveOtherGames();

      // logged out retrieval
      retrieveActiveGames();
      retrieveCompletedGames();
    },
    [user]
  );

  // functional
  async function joinGame(gameId) {
    try {
      const res = await axios.post("/api/game/joinGame", { gameId });
      const game = res.data;
      navigate(`/game/${game._id}`);
    } catch (e) {
      console.error("Couldn't join game. " + e);
    }
  }

  // FUNCTIONS WHEN USER LOGGED IN

  async function retrieveOtherOpenGames() {
    // open games curr user not pt of
    const res = await axios.get("/api/game/otherOpenGames/" + user);
    setOtherOpenGames(res.data);
  }

  async function retrieveMyOpenGames() {
    // open games curr user part of
    const res = await axios.get("/api/game/myOpenGames/" + user);
    setMyOpenGames(res.data);
  }

  async function retrieveMyActiveGames() {
    const res = await axios.get("/api/game/myActiveGames/" + user);
    setMyActiveGames(res.data);
  }

  async function retrieveMyCompletedGames() {
    const res = await axios.get("/api/game/myCompletedGames/" + user);
    setMyCompletedGames(res.data);
  }

  // functional
  async function retrieveOtherGames() {
    // active/completed games that curr user not part of
    const res = await axios.get("/api/game/otherGames/" + user);
    setOtherGames(res.data);
  }

  function provideLink(gameId, label) {
    return (
      <>
        <NavLink to={"/game/" + gameId} end>
          <Button label={label} className="button" />
        </NavLink>
      </>
    );
  }

  // functional
  function outputOtherOpenGames() {
    const openGames = [];
    let place = 1;

    for (let game of otherOpenGames) {
      const id = game._id;

      openGames.push(
        <div key={id}>
          <h2>
            {place++}. {game.p1}{" "}
          </h2>
          <NavLink to={"/game/" + id} end>
            <Button
              label="Join"
              className="button"
              onClick={() => joinGame(id)}
            />
          </NavLink>
        </div>
      );
    }

    return openGames.length === 0 ? (
      <h2> No Available Open Games</h2>
    ) : (
      openGames
    );
  }

  // functional
  function outputMyOpenGames() {
    const openGames = [];
    let place = 1;

    for (let game of myOpenGames) {
      const id = game._id;
      const start = game.start;

      openGames.push(
        <div key={id}>
          <h2>
            {place++}. Start: {new Date(start).toLocaleString()}
          </h2>
          {provideLink(id, "Enter")}
        </div>
      );
    }

    return openGames.length === 0 ? <h2> No Open Games</h2> : openGames;
  }

  // functional
  function outputMyActiveGames() {
    const games = [];
    let place = 1;

    for (let game of myActiveGames) {
      const id = game._id;
      const opponent = user === game.p1 ? game.p2 : game.p1;

      games.push(
        <div key={id}>
          <h2>
            {place++}. Opponent: {opponent}
          </h2>
          {provideLink(id, "Enter")}
        </div>
      );
    }
    return games.length === 0 ? <h2> No Active Games</h2> : games;
  }

  // functional
  function outputMyCompletedGames() {
    const games = [];
    let place = 1;

    for (let game of myCompletedGames) {
      const id = game._id;
      const opponent = user === game.p1 ? game.p2 : game.p1;
      const message = game.winner === user ? "Won" : "Lost";
      const start = game.start;
      const end = game.end;

      games.push(
        <div key={id}>
          <h2>
            {place++}. Opponent: {opponent} -- Start:{" "}
            {new Date(start).toLocaleString()} -- End:{" "}
            {new Date(end).toLocaleString()}
            -- {message}
          </h2>
          {provideLink(id, "Enter")}
        </div>
      );
    }
    return games.length === 0 ? <h2> No Completed Games</h2> : games;
  }

  // functional
  function outputOtherGames() {
    const games = [];
    let place = 1;

    for (let game of otherGames) {
      const id = game._id;
      const start = game.start;
      const p1 = game.p1;
      const p2 = game.p2;

      games.push(
        <div key={id}>
          <h2>
            {place++}. Start: {new Date(start).toLocaleString()} -- P1: {p1} --
            P2: {p2}
          </h2>
          {provideLink(id, "Enter")}
        </div>
      );
    }

    return games.length === 0 ? <h2> No Games</h2> : games;
  }

  // functional
  async function retrieveActiveGames() {
    const res = await axios.get("/api/game/allActive");
    setActiveGames(res.data);
  }

  // functional
  async function retrieveCompletedGames() {
    const res = await axios.get("/api/game/allCompleted");
    setCompletedGames(res.data);
  }

  // FUNCTIONS WHEN USER IS SIGNED OUT

  function outputAllActiveGames() {
    const games = [];
    let place = 1;

    for (let game of activeGames) {
      const id = game._id;
      const start = game.start;
      const p1 = game.p1;
      const p2 = game.p2;

      games.push(
        <div key={id}>
          <h2>
            {place++}. Start: {new Date(start).toLocaleString()} -- P1: {p1} --
            P2: {p2}
          </h2>
          {provideLink(id, "Enter")}
        </div>
      );
    }
    return games.length === 0 ? <h2> No Active Games</h2> : games;
  }

  function outputAllCompletedGames() {
    const games = [];
    let place = 1;

    for (let game of completedGames) {
      const id = game._id;
      const start = game.start;
      const end = game.end;
      const p1 = game.p1;
      const p2 = game.p2;
      const winner = game.winner;

      games.push(
        <div key={id}>
          <h2>
            {place++}. Start: {new Date(start).toLocaleString()} -- End:{" "}
            {new Date(end).toLocaleString()} -- P1: {p1} -- P2: {p2} -- Winner:{" "}
            {winner}
          </h2>
          {provideLink(id, "Enter")}
        </div>
      );
    }
    return games.length === 0 ? <h2> No Completed Games</h2> : games;
  }

  function loggedGamesPage() {
    return (
      <>
        <div>
          <h1> Open Games</h1>
          {outputOtherOpenGames()}
        </div>

        <div>
          <h1> My Open Games</h1>
          {outputMyOpenGames()}
        </div>

        <div>
          <h1> My Active Games</h1>
          {outputMyActiveGames()}
        </div>

        <div>
          <h1> My Completed Games</h1>
          {outputMyCompletedGames()}
        </div>

        <div>
          <h1> Other Games</h1>
          {outputOtherGames()}
        </div>
      </>
    );
  }

  function unloggedGamesPage() {
    return (
      <>
        <div>
          <h1>Active Games</h1>
          {outputAllActiveGames()}
        </div>
        <div>
          <h1>Completed Games</h1>
          {outputAllCompletedGames()}
        </div>
      </>
    );
  }

  function output() {
    // output depends on whether user is signed in
    return user === undefined ? unloggedGamesPage() : loggedGamesPage();
  }

  // final output to page
  return <div>{output()}</div>;
}
