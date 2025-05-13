import React from "react";
import NavigationButton from "../components/NavigationButton";
import "./QuestionScreen.css";

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
      <div className="music-player-container">
        <div className="question-visual-placeholder"></div>
      </div>
    </div>
  );
}

export default QuestionScreen;
