import React from "react";
import "../styles/styles.css";
import "../styles/highScores.css";

function HighScores() {
  return (
    <>
      <div>
        <h1>High Scores</h1>
      </div>

      <div className="table">
        <div id="header1" className="tableStyle headerStyle">
          Players
        </div>
        <div id="header2" className="tableStyle">
          Times
        </div>

        <div id="content1" className="tableStyle">
          <p>Frog 1</p>
          <p>Frog 2</p>
          <p>Frog 3</p>
          <p>Frog 4</p>
          <p>Frog 5</p>
        </div>

        <div id="content2" className="tableStyle">
          <p>0:01</p>
          <p>0:02</p>
          <p>0:03</p>
          <p>0:04</p>
          <p>0:05</p>
        </div>
      </div>
    </>
  );
}

export default HighScores;
