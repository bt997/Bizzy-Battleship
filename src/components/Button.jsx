import React from "react";
import "../styles/button.css";

function Button({ label, className = "", id = "" }) {
  return (
    <>
      <button id={id} className={className}>
        {label}
      </button>
    </>
  );
}
export default Button;
