import React, { useEffect, useState } from 'react';
import AnswerRevealItem from '../components/AnswerRevealItem';
import { QUESTIONS_DATABASE } from '../constants';

interface RevealScreenProps {
  round: number;
  questionsPerRound: number;
  onNext: () => void;
  onReady?: () => void;
}

function RevealScreen({ round, questionsPerRound, onReady }: RevealScreenProps) {
  useEffect(() => {
    // Show navigation buttons after a short delay
    const timer = setTimeout(() => {
      onReady?.();
    }, 500);

    return () => clearTimeout(timer);
  }, [onReady]);

  // Generate 10 questions for this round (always show 10 regardless of questionsPerRound setting)
  const getRoundQuestions = () => {
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const globalQuestionIndex = ((round - 1) * 10 + i) % QUESTIONS_DATABASE.length;
      const question = QUESTIONS_DATABASE[globalQuestionIndex];
      questions.push({
        number: i + 1,
        answer: question.answer,
      });
    }
    return questions;
  };

  const roundQuestions = getRoundQuestions();
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
        {roundQuestions.map(question => (
          <AnswerRevealItem
            key={question.number}
            number={question.number}
            answer={question.answer}
            isClickable={question.number <= questionsPerRound}
          />
        ))}
      </div>
    </div>
  );
}

export default RevealScreen;
