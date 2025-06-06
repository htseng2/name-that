import React, { useEffect } from 'react';
import Logo from '../components/Logo.tsx';

interface RoundIntroProps {
  round: number;
  questionsPerRound: number;
  onAnimationComplete: () => void;
}

function RoundIntro({ round, questionsPerRound, onAnimationComplete }: RoundIntroProps) {
  useEffect(() => {
    onAnimationComplete();
  }, [onAnimationComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 w1194:gap-6 w1920:gap-8 w2560:gap-12">
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
          ROUND {round}
        </div>
      </div>
      <div
        className="font-black leading-none tracking-normal text-center capitalize text-white flex items-center justify-center
      text-2xl w-[250px] h-[32px]
      w1194:text-3xl w1194:w-[320px] w1194:h-[40px]
      w1280:text-4xl w1280:w-[370px] w1280:h-[44px]
      w1366:text-3xl w1366:w-[320px] w1366:h-[40px]
      w1440:text-4xl w1440:w-[420px] w1440:h-[50px]
      w1920:text-5xl w1920:w-[500px] w1920:h-[60px]
      w2560:text-6xl w2560:w-[640px] w2560:h-[75px]"
      >
        {questionsPerRound} Questions
      </div>
    </div>
  );
}

export default RoundIntro;
