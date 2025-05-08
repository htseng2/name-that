import React from "react";
import Logo from "../components/Logo";

function RoundIntro({ round, onNext }) {
  return (
    <div className="round-intro-screen">
      <Logo />
      <h2>Round {round}</h2>
      <button type="button" onClick={onNext}>
        Start Round
      </button>
    </div>
  );
}

export default RoundIntro;
