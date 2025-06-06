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
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div>
        <Logo />
      </div>
      <div
        className="-rotate-[1.96deg] w-[1551.93px] h-[226.15px] rounded-tr-[25px] rounded-br-[25px] py-3 px-[42px] gap-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] flex items-center justify-center"
        style={{
          transform: 'rotate(-1.96deg)',
        }}
      >
        <div className="w-[573.46px] h-[96.14px] font-black text-[96px] leading-[96px] tracking-normal text-center text-[#525252] flex items-center justify-center">
          ROUND {round}
        </div>
      </div>
      <div className="w-[370px] h-[44px] font-black text-4xl leading-none tracking-normal text-center capitalize text-white flex items-center justify-center">
        {questionsPerRound} Questions
      </div>
    </div>
  );
}

export default RoundIntro;
