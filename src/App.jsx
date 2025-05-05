import "./App.css";
import { TbTriangleFilled } from "react-icons/tb";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FaQuestion } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const EDITION_OPTIONS = [
  "1980s Edition",
  "1990s Edition",
  "Christmas Edition",
  "Halloween Edition",
  "Tom Cruise Edition",
  "TV Show Edition",
  "2000s Edition",
  "1970s Edition",
  "Movie Star Edition",
  "Music Icons Edition",
  "Sports Legends Edition",
  "Sci-Fi Edition",
  "Disney Edition",
  "Sitcom Edition",
  "Oscar Winners Edition",
  "Superhero Edition",
  "Action Movies Edition",
  "Anime Edition",
];

function App() {
  const pageSize = 6;
  const [startIndex, setStartIndex] = useState(0);
  const totalPages = Math.ceil(EDITION_OPTIONS.length / pageSize);
  const activePage = Math.floor(startIndex / pageSize);
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  return (
    <div className="App">
      <div className="main-layout-grid">
        <div className="title">NAME THAT!</div>
        <div className="picker picker-grid">
          <button
            type="button"
            className="picker-button picker-button-up"
            onClick={() =>
              setStartIndex((prev) => Math.max(prev - pageSize, 0))
            }
          >
            <TbTriangleFilled />
          </button>
          <div className="edition-options">
            {EDITION_OPTIONS.slice(startIndex, startIndex + pageSize).map(
              (option, idx) => (
                <div key={startIndex + idx} className="edition-option">
                  {option}
                </div>
              )
            )}
          </div>
          <div className="pagination-dots">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`dot${idx === activePage ? " active" : ""}`}
                onClick={() => setStartIndex(idx * pageSize)}
              >
                <GoDotFill />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="picker-button picker-button-down"
            onClick={() =>
              setStartIndex((prev) =>
                Math.min(prev + pageSize, (totalPages - 1) * pageSize)
              )
            }
          >
            <TbTriangleInvertedFilled />
          </button>
        </div>
        <div className="image-display">
          <img src="https://placehold.co/370x370" alt="placeholder" />
        </div>
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
          onClick={() => {
            console.log("Game started!");
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
        <div className="popup-overlay" onClick={() => setShowSettings(false)}>
          <div className="settings-popup" onClick={(e) => e.stopPropagation()}>
            {/* Settings content goes here */}
          </div>
        </div>
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
