import React from "react";
import "../styles/entryfield.css";

export default function EntryField({ label, onChange = () => {} }) {
  return (
    <div className="entryfield-container">
      <div className="entryfield-label">{label}:</div>
      <input
        className="entryfield"
        onChange={onChange}
      />
    </div>
  );
}
