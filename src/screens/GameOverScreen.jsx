import React from 'react';

function GameOverScreen({ onRestart }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white">
      <h2 className="text-4xl font-bold">Game Over!</h2>
      <button
        type="button"
        className="w-[216px] h-[50px] px-6 py-3 rounded-[8px] bg-gradient-to-b from-[#66ed18] to-[#0e890e] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-center font-black text-2xl leading-none tracking-normal text-white active:bg-blend-overlay active:shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] active:[background:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#66ed18_-33.77%,#0e890e_107.78%)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
        onClick={onRestart}
      >
        Play Again
      </button>
    </div>
  );
}

export default GameOverScreen;
