import React from 'react';
import Logo from '../components/Logo.tsx';

interface GameOverScreenProps {
  onRestart: () => void;
}

function GameOverScreen({ onRestart }: GameOverScreenProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 w1194:gap-6 w1920:gap-8 w2560:gap-12 overflow-hidden">
      <div>
        <Logo />
      </div>
      <div
        className="-rotate-[1.96deg] rounded-tr-[25px] rounded-br-[25px] py-3 px-[42px] gap-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] flex items-center justify-center
        w-[1000px] h-[150px]
        w1194:w-[1400px] w1194:h-[180px] w1194:py-4 w1194:px-[56px]
        w1280:w-[1500px] w1280:h-[200px] w1280:py-4 w1280:px-[64px]
        w1366:w-[1600px] w1366:h-[180px] w1366:py-4 w1366:px-[56px]
        w1440:w-[1700px] w1440:h-[220px] w1440:py-5 w1440:px-[72px]
        w1920:w-[2200px] w1920:h-[260px] w1920:py-6 w1920:px-[84px]
        w2560:w-[2800px] w2560:h-[320px] w2560:py-8 w2560:px-[108px]"
        style={{
          transform: 'rotate(-1.96deg)',
        }}
      >
        <div
          className="font-black tracking-normal text-center text-[#525252] flex items-center justify-center
        text-[48px] leading-[48px] w-[350px] h-[64px]
        w1194:text-[64px] w1194:leading-[64px] w1194:w-[450px] w1194:h-[80px]
        w1280:text-[72px] w1280:leading-[72px] w1280:w-[500px] w1280:h-[90px]
        w1366:text-[64px] w1366:leading-[64px] w1366:w-[450px] w1366:h-[80px]
        w1440:text-[80px] w1440:leading-[80px] w1440:w-[550px] w1440:h-[100px]
        w1920:text-[96px] w1920:leading-[96px] w1920:w-[650px] w1920:h-[120px]
        w2560:text-[120px] w2560:leading-[120px] w2560:w-[800px] w2560:h-[150px]"
        >
          GAME OVER!
        </div>
      </div>
      <div className="flex items-center justify-center mt-4 w1194:mt-6 w1920:mt-8 w2560:mt-12">
        <button
          type="button"
          className="w-[216px] h-[50px] px-6 py-3 rounded-[8px] bg-gradient-to-b from-[#66ed18] to-[#0e890e] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-center font-black text-2xl leading-none tracking-normal text-white active:bg-blend-overlay active:shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] active:[background:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#66ed18_-33.77%,#0e890e_107.78%)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOverScreen;
