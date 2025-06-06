import React from 'react';
import MusicPlayer from '../components/MusicPlayer';
import MovieQuestion from '../components/MovieQuestion';
import { QUESTIONS_DATABASE } from '../constants';

interface QuestionScreenProps {
  round: number;
  questionIndex: number;
}

function QuestionScreen({ round, questionIndex }: QuestionScreenProps) {
  // Calculate the global question index across all rounds
  // For now, we'll cycle through the questions in order
  const globalQuestionIndex = ((round - 1) * 10 + questionIndex) % QUESTIONS_DATABASE.length;
  const currentQuestion = QUESTIONS_DATABASE[globalQuestionIndex];

  return (
    <div className="w-full h-full flex flex-col items-center pt-6 relative">
      <div className="flex flex-col items-center w-fit mx-auto">
        <div className="font-black text-[32px] leading-none tracking-[.05em] uppercase text-[#8796a0] py-1">
          ROUND {round}
        </div>
        <div className="font-black text-[56px] leading-none tracking-[.05em] text-center uppercase text-[#e2e2e2] py-2 [text-shadow:0px_-1px_1px_rgba(255,255,255,0.5),_0px_4px_4px_rgba(0,0,0,0.25)]">
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
