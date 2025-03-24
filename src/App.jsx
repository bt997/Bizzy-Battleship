import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import HighScores from "./pages/HighScores";
import NormalMode from "./pages/game/normal";
import EasyMode from "./pages/game/easy";
import "./styles/styles.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/highscores" element={<HighScores />} />
        <Route path="/game/easy" element={<EasyMode />} />
        <Route path="/game/normal" element={<NormalMode />} />
      </Routes>
    </>
  );
}
export default App;
