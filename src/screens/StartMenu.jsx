import React, { useState, useRef } from "react";
import { FaQuestion } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Logo from "../components/Logo";
import EditionPicker from "../components/EditionPicker";
import EditionDisplay from "../components/EditionDisplay";
import SettingsPopup from "../components/SettingsPopup";
import InfoPopup from "../components/InfoPopup";
import { EDITION_OPTIONS } from "../constants";

function StartMenu({
  onStart,
  rounds,
  questionsPerRound,
  onChangeRounds,
  onChangeQuestionsPerRound,
}) {
  const logoRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const pageSize = 6;
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isStartDisabled =
    selectedIndex === null || !EDITION_OPTIONS[selectedIndex]?.img;

  const handleStart = () => {
    if (isStartDisabled || isAnimating || !logoRef.current) return;
    setIsAnimating(true);
    const logoEl = logoRef.current;
    const rect = logoEl.getBoundingClientRect();
    const scale = 64 / rect.height;

    // Clone the logo so the grid layout doesn't reflow
    const clone = logoEl.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = "0";
    clone.style.zIndex = "1000";
    clone.style.transition = "transform 0.5s ease";
    document.body.appendChild(clone);

    // Hide the original logo
    logoEl.style.visibility = "hidden";

    // Calculate deltas to center
    const dx = window.innerWidth / 2 - rect.left - rect.width / 2;
    const dy = window.innerHeight / 2 - rect.top - rect.height / 2;

    // Trigger reflow before animating
    clone.getBoundingClientRect();

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    });

    setTimeout(() => {
      onStart({ rounds, questionsPerRound, selectedIndex });
      document.body.removeChild(clone); // Remove the clone after navigation
    }, 500);
  };

  return (
    <div className="main-layout-grid">
      <Logo ref={logoRef} />
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
        disabled={isStartDisabled || isAnimating}
        onClick={handleStart}
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
          onChangeRounds={onChangeRounds}
          onChangeQuestionsPerRound={onChangeQuestionsPerRound}
          onClose={() => setShowSettings(false)}
        />
      )}
      {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}
    </div>
  );
}

export default StartMenu;
