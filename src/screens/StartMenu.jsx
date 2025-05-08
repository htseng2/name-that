import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Logo from "../components/Logo";
import EditionPicker from "../components/EditionPicker";
import EditionDisplay from "../components/EditionDisplay";
import SettingsPopup from "../components/SettingsPopup";
import InfoPopup from "../components/InfoPopup";
import { EDITION_OPTIONS } from "../constants";

function StartMenu({ onStart }) {
  const pageSize = 6;
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [rounds, setRounds] = useState(4);
  const [questionsPerRound, setQuestionsPerRound] = useState(10);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isStartDisabled =
    selectedIndex === null || !EDITION_OPTIONS[selectedIndex]?.img;

  return (
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
        onClick={() =>
          !isStartDisabled &&
          onStart({
            rounds,
            questionsPerRound,
            selectedIndex,
          })
        }
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

export default StartMenu;
