import React, { useEffect } from 'react';
import MusicPlayer from '../components/MusicPlayer';
import MovieQuestion from '../components/MovieQuestion';
import { QUESTIONS_DATABASE } from '../constants';

interface QuestionScreenProps {
  round: number;
  questionIndex: number;
  gameQuestions: typeof QUESTIONS_DATABASE;
  onReady?: () => void;
}

function QuestionScreen({ round, questionIndex, gameQuestions, onReady }: QuestionScreenProps) {
  useEffect(() => {
    // Show navigation buttons after a short delay
    const timer = setTimeout(() => {
      onReady?.();
    }, 500);

    return () => clearTimeout(timer);
  }, [onReady]);
  // Use the question index directly from the current round's shuffled questions
  const currentQuestion = gameQuestions[questionIndex] || gameQuestions[0]; // Fallback to first question if index out of bounds

  return (
    <div
      className="w-full h-full flex flex-col items-center relative
      pt-6 gap-4
      w1194:pt-8 w1194:gap-6
      w1280:pt-8 w1280:gap-8
      w1366:pt-8 w1366:gap-6
      w1440:pt-10 w1440:gap-8
      w1920:pt-12 w1920:gap-10
      w2560:pt-16 w2560:gap-12"
    >
      <div className="flex flex-col items-center w-fit mx-auto">
        <div
          className="font-black leading-none tracking-[.05em] uppercase text-[#8796a0] py-1
        text-[20px]
        w1194:text-[28px]
        w1280:text-[30px]
        w1366:text-[28px]
        w1440:text-[32px]
        w1920:text-[32px]
        w2560:text-[40px]"
        >
          ROUND {round}
        </div>
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
          QUESTION {questionIndex + 1}
        </div>
      </div>

      {currentQuestion.type === 'song' ? (
        <MusicPlayer songUrl={currentQuestion.url} />
      ) : (
        <MovieQuestion movieScreenshotUrl={currentQuestion.url} />
      )}
    </div>
  );
}

export default QuestionScreen;
