import React from "react";
import "../styles/button.css";

function Button({ label, className = "", id = "", onClick = () => {}, }) {
  return (
    <>
      <button id={id} className={className} onClick={onClick}>
        {label}
      </button>
    </>
  );
}
export default Button;
