import "./App.css";
import EditionPicker from "./components/EditionPicker";
import { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import InfoPopup from "./components/InfoPopup";
import Logo from "./components/Logo";
import { EDITION_OPTIONS } from "./constants";
import EditionDisplay from "./components/EditionDisplay";
import SettingsPopup from "./components/SettingsPopup";

function App() {
  const pageSize = 6;
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [rounds, setRounds] = useState(4);
  const [questionsPerRound, setQuestionsPerRound] = useState(10);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [_gameStarted, setGameStarted] = useState(false);
  const isStartDisabled =
    selectedIndex === null || !EDITION_OPTIONS[selectedIndex]?.img;

  return (
    <div className="App">
      <div className="main-layout-grid">
        <Logo />
        <EditionPicker
          options={EDITION_OPTIONS}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          pageSize={pageSize}
        />
        <EditionDisplay edition={EDITION_OPTIONS[selectedIndex]} />
        <button
          type="button"
          className="app-button app-button-info"
          onClick={() => setShowInfo(true)}
        >
          <FaQuestion />
        </button>
        <button
          type="button"
          className="cta-button cta-button-start"
          disabled={isStartDisabled}
          onClick={() => {
            if (!isStartDisabled) setGameStarted(true);
          }}
        >
          START GAME
        </button>
        <button
          type="button"
          className="app-button app-button-settings"
          onClick={() => setShowSettings(true)}
        >
          <FaGear />
        </button>
      </div>
      {showSettings && (
        <SettingsPopup
          rounds={rounds}
          questionsPerRound={questionsPerRound}
          onChangeRounds={setRounds}
          onChangeQuestionsPerRound={setQuestionsPerRound}
          onClose={() => setShowSettings(false)}
        />
      )}
      {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}
    </div>
  );
}

export default App;
