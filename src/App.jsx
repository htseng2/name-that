import "./App.css";
import StartMenu from "./screens/StartMenu";
import RoundIntro from "./screens/RoundIntro";
import QuestionScreen from "./screens/QuestionScreen";
import RevealScreen from "./screens/RevealScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { useState } from "react";

function App() {
  const [screen, setScreen] = useState("start");
  const [round, setRound] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [settings, setSettings] = useState({
    rounds: 2,
    questionsPerRound: 2,
  });
  const [_selectedEditionIndex, setSelectedEditionIndex] = useState(null);
  const [roundIntroKey, setRoundIntroKey] = useState(0);

  const goTo = (next) => {
    if (next === "intro") {
      setRoundIntroKey((prevKey) => prevKey + 1);
    }
    setScreen(next);
  };

  const handleStart = ({ rounds, questionsPerRound, selectedIndex }) => {
    setSettings({ rounds, questionsPerRound });
    setSelectedEditionIndex(selectedIndex);
    setRound(1);
    setQuestionIndex(0);
    goTo("intro");
  };

  const handleRevealNext = () => {
    if (round < settings.rounds) {
      setRound(round + 1);
      setQuestionIndex(0);
      goTo("intro");
    } else {
      goTo("over");
    }
  };

  const handleAnswer = () => {
    if (questionIndex + 1 < settings.questionsPerRound) {
      setQuestionIndex(questionIndex + 1);
      goTo("question");
    } else {
      goTo("reveal");
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      goTo("question");
    } else {
      goTo("intro");
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case "start":
        return (
          <StartMenu
            rounds={settings.rounds}
            questionsPerRound={settings.questionsPerRound}
            onChangeRounds={(r) => setSettings((s) => ({ ...s, rounds: r }))}
            onChangeQuestionsPerRound={(q) =>
              setSettings((s) => ({ ...s, questionsPerRound: q }))
            }
            onStart={handleStart}
          />
        );
      case "intro":
        return (
          <RoundIntro
            key={roundIntroKey}
            round={round}
            questionsPerRound={settings.questionsPerRound}
            onNext={() => goTo("question")}
          />
        );
      case "question":
        return (
          <QuestionScreen
            questionIndex={questionIndex}
            onAnswer={handleAnswer}
            onPrevious={handlePreviousQuestion}
          />
        );
      case "reveal":
        return <RevealScreen round={round} onNext={handleRevealNext} />;
      case "over":
        return <GameOverScreen onRestart={() => goTo("start")} />;
      default:
        return null;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;
