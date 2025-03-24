import React from "react";
import Button from "./Button";

function Credits() {
  const izzyLinkedIn = "https://www.linkedin.com/in/li-isabelle88/";
  const brianLinkedIn = "https://www.linkedin.com/in/brian-tran97/";
  const git = "https://github.com/izzyli88/Brian_Isabelle--Tran_Li--project2";

  return (
    <>
      <nav className="navBar">
        <a href={git} target="_blank" rel="noopener noreferrer">
          <Button label="GitHub" className="button" />
        </a>
        <a href={brianLinkedIn} target="_blank" rel="noopener noreferrer">
          <Button label="Brian" className="button" />
        </a>
        <a href={izzyLinkedIn} target="_blank" rel="noopener noreferrer">
          <Button label="Isabelle" className="button" />
        </a>
      </nav>
    </>
  );
}
export default Credits
