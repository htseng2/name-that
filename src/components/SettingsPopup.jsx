import React, { useState } from "react";
import "./SettingsPopup.css";
import RoundSelector from "./RoundSelector";

function SettingsPopup({
  rounds,
  questionsPerRound,
  onChangeRounds,
  onChangeQuestionsPerRound,
  onClose,
}) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 300);
  };

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div
        className={`settings-popup${closing ? " slide-out" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="settings-popup-title">Settings</div>
          <div className="settings-divider" />
        </div>
        <div className="settings-popup-content">
          <div className="settings-popup-content-item">
            <div className="settings-popup-content-item-info">
              <div className="settings-popup-content-item-title">Rounds</div>
              <div className="settings-popup-content-item-description">
                (Max = 4 Rounds)
              </div>
            </div>
            <RoundSelector
              min={1}
              max={4}
              initial={rounds}
              onChange={onChangeRounds}
            />
          </div>
          <div className="settings-popup-content-item">
            <div className="settings-popup-content-item-info">
              <div className="settings-popup-content-item-title">
                Questions Per Round
              </div>
              <div className="settings-popup-content-item-description">
                (Max = 10 Questions)
              </div>
            </div>
            <RoundSelector
              min={1}
              max={10}
              initial={questionsPerRound}
              onChange={onChangeQuestionsPerRound}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPopup;
