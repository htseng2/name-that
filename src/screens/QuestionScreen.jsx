import React from "react";
import NavigationButton from "../components/NavigationButton";

function QuestionScreen({ questionIndex, onAnswer, onPrevious }) {
  return (
    <div className="question-screen">
      <NavigationButton
        onClick={onAnswer}
        show={true}
        direction="next"
        label="Answer Question"
      />
      <NavigationButton
        onClick={onPrevious}
        show={true}
        direction="previous"
        label="Previous Question"
      />
      <h3>Question {questionIndex + 1}</h3>
    </div>
  );
}

export default QuestionScreen;
