import React, { useEffect } from 'react';

interface RevealScreenProps {
  round: number;
  onNext: () => void;
  onReady?: () => void;
}

function RevealScreen({ round, onReady }: RevealScreenProps) {
  useEffect(() => {
    // Show navigation buttons after a short delay
    const timer = setTimeout(() => {
      onReady?.();
    }, 500);

    return () => clearTimeout(timer);
  }, [onReady]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white">
      <div
        className="font-black leading-none tracking-[.05em] text-center uppercase text-[#e2e2e2] py-2 [text-shadow:0px_-1px_1px_rgba(255,255,255,0.5),_0px_4px_4px_rgba(0,0,0,0.25)]
        text-[36px]
        w1194:text-[48px]
        w1280:text-[52px]
        w1366:text-[48px]
        w1440:text-[56px]
        w1920:text-[56px]
        w2560:text-[68px]"
      >
        ROUND {round}
      </div>
      <h3 className="text-3xl font-bold">Reveal for Round {round}</h3>
    </div>
  );
}

export default RevealScreen;
