import React from "react";
import "./InfoPopup.css";
import { FaTimes } from "react-icons/fa";

function InfoPopup({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="info-popup" onClick={(e) => e.stopPropagation()}>
        <div className="info-popup-title">INSTRUCTIONS</div>
        <button
          type="button"
          className="info-popup-close-button"
          onClick={onClose}
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
              Players/Teams can write their answers on a piece of paper. At the
              end of the round, exchange answer sheets with another player/team
              for scoring (this is done to ensure fairness).
            </li>
            <li>
              The Host will make all final judgement calls and their decision
              will be final.
            </li>
            <li>(Optional) Consider making the final round worth 2x points!</li>
            <li>Have a great game!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoPopup;
