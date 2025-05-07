import "./App.css";
import EditionPicker from "./components/EditionPicker";
import { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import RoundSelector from "./components/RoundSelector";
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
      {showInfo && (
        <div className="popup-overlay" onClick={() => setShowInfo(false)}>
          <div className="info-popup" onClick={(e) => e.stopPropagation()}>
            <div className="info-popup-title">INSTRUCTIONS</div>
            <button
              type="button"
              className="info-popup-close-button"
              onClick={() => setShowInfo(false)}
              aria-label="Close info popup"
            >
              <FaTimes />
            </button>
            <div className="info-popup-content">
              <ul>
                <li>
                  Make sure your sound is turned ON. If you're playing via
                  videoconference, ensure you are sharing screen with sound.
                </li>
                <li>
                  Give 30–60 seconds per question before moving on to the next
                  question. You may play the audio/video clip multiple times.
                </li>
                <li>
                  Players/Teams can write their answers on a piece of paper. At
                  the end of the round, exchange answer sheets with another
                  player/team for scoring (this is done to ensure fairness).
                </li>
                <li>
                  The Host will make all final judgement calls and their
                  decision will be final.
                </li>
                <li>
                  (Optional) Consider making the final round worth 2x points!
                </li>
                <li>Have a great game!</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
