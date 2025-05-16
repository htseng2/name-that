import React from "react";
import NavigationButton from "../components/NavigationButton";
// import "./QuestionScreen.css"; // Remove this import
import MusicPlayer from "../components/MusicPlayer";
import MovieQuestion from "../components/MovieQuestion";
import { QUESTIONS_DATABASE } from "../constants";
import toyStory from "../assets/movies/toy-story.webp";

function QuestionScreen({ round, questionIndex, onNext, onPrevious }) {
  return (
    <div className="w-full h-full flex flex-col items-center pt-6 relative">
      {" "}
      {/* Added pt-6 for header margin-top */}
      <NavigationButton
        onClick={onPrevious}
        show={true}
        direction="previous"
        label="Previous Question"
      />
      <NavigationButton
        onClick={onNext}
        show={true}
        direction="next"
        label="Answer Question"
      />
      <div className="flex flex-col items-center w-fit mx-auto">
        {" "}
        {/* .question-header - removed mt-6 as applied to parent now */}
        <div className="font-black text-[32px] leading-none tracking-[.05em] uppercase text-[#8796a0] py-1">
          ROUND {round}
        </div>
        <div className="font-black text-[56px] leading-none tracking-[.05em] text-center uppercase text-[#e2e2e2] py-2 [text-shadow:0px_-1px_1px_rgba(255,255,255,0.5),_0px_4px_4px_rgba(0,0,0,0.25)]">
          QUESTION {questionIndex + 1}
        </div>
      </div>
      {/* <MusicPlayer /> */}
      <MovieQuestion movieScreenshotUrl={toyStory} />
    </div>
  );
}

export default QuestionScreen;
