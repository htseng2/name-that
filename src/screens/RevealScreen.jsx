import React from "react";

function RevealScreen({ round, onNext }) {
  return (
    <div className="reveal-screen">
      <h3>Reveal for Round {round}</h3>
      <button type="button" onClick={onNext}>
        Next
      </button>
    </div>
  );
}

export default RevealScreen;
