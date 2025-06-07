import React, { useEffect, useState } from 'react';

interface RevealScreenProps {
  round: number;
  onNext: () => void;
  onReady?: () => void;
}

function RevealScreen({ round, onReady }: RevealScreenProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Show navigation buttons after a short delay
    const timer = setTimeout(() => {
      onReady?.();
    }, 500);

    return () => clearTimeout(timer);
  }, [onReady]);

  const handleReveal = () => {
    setIsRevealed(true);
  };
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
      <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-[#053B60]">
        <div className="flex gap-1 w-[585px]">
          <div className="bg-white w-[30px] h-[26px] flex items-center justify-center p-1">1</div>
          <div className="relative w-[550px] h-[26px]">
            {/* Answer (behind) */}
            <div className="absolute inset-0 bg-white flex items-center justify-start p-1">
              GIMME MORE (BRITNEY SPEARS)
            </div>
            {/* Instruction (in front, clickable) */}
            {!isRevealed && (
              <div
                className="absolute inset-0 bg-[#FBD11E] flex items-center justify-start p-0 cursor-pointer border-4 border-[#FBD11E] transition-all hover:[background:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),#FBD11E]"
                onClick={handleReveal}
              >
                <span className="px-1">CLICK ANY YELLOW SPACE TO REVEAL THE ANSWER</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevealScreen;
