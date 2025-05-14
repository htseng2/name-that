import React from "react";
import NavigationButton from "../components/NavigationButton";
import "./QuestionScreen.css";
import MusicPlayer from "../components/MusicPlayer";
import { QUESTIONS_DATABASE } from "../constants";

function QuestionScreen({ round, questionIndex, onNext, onPrevious }) {
  return (
    <div className="question-screen">
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
      <div className="question-header">
        <div className="question-header-round">ROUND {round}</div>
        <div className="question-header-number">
          QUESTION {questionIndex + 1}
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}

export default QuestionScreen;
