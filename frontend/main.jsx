import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Rules from "./pages/Rules";
import HighScores from "./pages/HighScores";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllGames from "./pages/AllGames";
import Navbar from "./components/NavBar";
import ResetPassword from "./pages/ResetPassword";
import { UserProvider } from "./context/UserContext";

import "./styles/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/rules",
    element: (
      <>
        <Navbar />
        <Rules />
      </>
    ),
  },
  {
    path: "/highscores",
    element: (
      <>
        <Navbar />
        <HighScores />
      </>
    ),
  },
  {
    path: "/game/:gameId",
    element: (
      <>
        <Navbar />
        <Game />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
      </>
    ),
  },
  {
    path: "/games",
    element: (
      <>
        <Navbar />
        <AllGames />
      </>
    ),
  },
  {
    path: "/reset",
    element: (
      <>
        <Navbar />
        <ResetPassword />
      </>
    )
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
