import React from "react";
import NavigationButton from "../components/NavigationButton";
import "./QuestionScreen.css";
import questionMark from "../assets/question-mark.webp";
import play from "../assets/play.webp";

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
        <div className="question-visual-placeholder">
          <img src={questionMark} alt="Question Mark" />
        </div>
        <button className="play-button">
          <img src={play} alt="Play" />
        </button>
        <div className="play-bar-container">
          <span className="current-time">0:00</span>
          <div className="progress-bar-background">
            <div className="progress-bar-elapsed"></div>
          </div>
          <span className="total-duration">0:00</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;
