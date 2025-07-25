import React, { useState } from 'react';

interface AnswerRevealItemProps {
  number: number;
  answer: string;
  isClickable: boolean;
}

function AnswerRevealItem({ number, answer, isClickable }: AnswerRevealItemProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="flex gap-1 w-[585px]">
      <div className="bg-white w-[30px] h-[26px] flex items-center justify-center p-1">
        {number}
      </div>
      <div className="relative w-[550px] h-[26px]">
        {/* Answer (behind) */}
        <div className="absolute inset-0 bg-white flex items-center justify-start p-1">
          {answer}
        </div>
        {/* Instruction (in front, clickable or not) */}
        {!isRevealed && (
          <div
            className={`absolute inset-0 bg-[#FBD11E] flex items-center justify-start p-0 border-4 border-[#FBD11E] ${
              isClickable
                ? 'cursor-pointer transition-all hover:[background:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),#FBD11E]'
                : ''
            }`}
            onClick={isClickable ? handleReveal : undefined}
          >
            {isClickable && (
              <span className="px-1">CLICK ANY YELLOW SPACE TO REVEAL THE ANSWER</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnswerRevealItem;
