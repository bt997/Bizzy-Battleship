import React from "react";
import "../styles/styles.css";
import "../styles/rules.css";
import Credits from "../components/Credits";

export default function Rules() {
  return (
    <>
      <div></div>
      {/* rules */}
      <div className="container">
        <div className="circle">Place ships</div>
        <div className="circle">Take turns firing</div>
        <div className="circle">Hit all parts of ship</div>
        <div className="circle">Sink all ships</div>
      </div>

      {/* creds */}
      <Credits />
    </>
  );
}
