import React from "react";

function QuestionScreen({ questionIndex, onAnswer }) {
  return (
    <div className="question-screen">
      <h3>Question {questionIndex + 1}</h3>
      <button type="button" onClick={onAnswer}>
        Answer Question
      </button>
    </div>
  );
}

export default QuestionScreen;
