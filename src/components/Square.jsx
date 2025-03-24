import "../styles/button.css";
import "../styles/styles.css";
import "../styles/square.css";

function Square({ status, onHit, isAi }) {
  let currClass = "square";
  let currSymbol = "";

  if (isAi) {
    // ai board
    if (status === "hit") {
      currClass += " filledBox hitBox";
      currSymbol = "✔";
    } else if (status === "miss") {
      currClass += " filledBox missBox";
      currSymbol = "X";
    }
  } else {
    // own board
    if (status === "hit") {
      currClass += " filledBox missBox";
      currSymbol = "X";
    } else if (status === "ship") {
      currClass += " shipBox";
      currSymbol = "●";
    }
  }

  return (
    <div className={currClass} onClick={onHit}>
      {currSymbol}
    </div>
  );
}
export default Square
