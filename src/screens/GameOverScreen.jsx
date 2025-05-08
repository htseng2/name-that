import React from "react";

function GameOverScreen({ onRestart }) {
  return (
    <div className="game-over-screen">
      <h2>Game Over!</h2>
      <button type="button" onClick={onRestart}>
        Play Again
      </button>
    </div>
  );
}

export default GameOverScreen;
