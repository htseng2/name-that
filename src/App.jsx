import "./App.css";
import { TbTriangleFilled } from "react-icons/tb";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FaQuestion } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import RoundSelector from "./RoundSelector";
import edition1980s from "./assets/editions/edition-1980s.webp";
import edition1990s from "./assets/editions/edition-1990s.webp";
import editionChristmas from "./assets/editions/edition-christmas.webp";
import editionHalloween from "./assets/editions/edition-halloween.webp";
import editionTomCruise from "./assets/editions/edition-tom-cruise.webp";
import editionTVShow from "./assets/editions/edition-tv-show.webp";
import notAvailable from "./assets/editions/not-available.webp";

const EDITION_OPTIONS = [
  { title: "1980s Edition", img: edition1980s },
  { title: "1990s Edition", img: edition1990s },
  { title: "Christmas Edition", img: editionChristmas },
  { title: "Halloween Edition", img: editionHalloween },
  { title: "Tom Cruise Edition", img: editionTomCruise },
  { title: "TV Show Edition", img: editionTVShow },
  { title: "2000s Edition" },
  { title: "1970s Edition" },
  { title: "Movie Star Edition" },
  { title: "Music Icons Edition" },
  { title: "Sports Legends Edition" },
  { title: "Sci-Fi Edition" },
  { title: "Disney Edition" },
  { title: "Sitcom Edition" },
  { title: "Oscar Winners Edition" },
  { title: "Superhero Edition" },
  { title: "Action Movies Edition" },
  { title: "Anime Edition" },
];

function App() {
  const pageSize = 6;
  const [startIndex, setStartIndex] = useState(0);
  const totalPages = Math.ceil(EDITION_OPTIONS.length / pageSize);
  const activePage = Math.floor(startIndex / pageSize);
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [rounds, setRounds] = useState(4);
  const [questionsPerRound, setQuestionsPerRound] = useState(10);
  const [selectedIndex, setSelectedIndex] = useState(null);
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
              (option, idx) => {
                const globalIdx = startIndex + idx;
                return (
                  <div
                    key={globalIdx}
                    className={`edition-option${
                      selectedIndex === globalIdx ? " selected" : ""
                    }`}
                    onClick={() => setSelectedIndex(globalIdx)}
                  >
                    {option.title}
                  </div>
                );
              }
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
          <img
            src={EDITION_OPTIONS[selectedIndex]?.img ?? notAvailable}
            alt={EDITION_OPTIONS[selectedIndex]?.title || "placeholder"}
          />
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
            <div>
              <div className="settings-popup-title">Settings</div>
              <div className="settings-divider" />
            </div>
            <div className="settings-popup-content">
              <div className="settings-popup-content-item">
                <div className="settings-popup-content-item-info">
                  <div className="settings-popup-content-item-title">
                    Rounds
                  </div>
                  <div className="settings-popup-content-item-description">
                    (Max = 4 Rounds)
                  </div>
                </div>

                <RoundSelector
                  min={1}
                  max={4}
                  initial={rounds}
                  onChange={setRounds}
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
                  onChange={setQuestionsPerRound}
                />
              </div>
            </div>
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
