import "./App.css";
import { TbTriangleFilled } from "react-icons/tb";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { FaQuestion } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

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
  return (
    <div className="App">
      <div className="main-layout-grid">
        <div className="title">NAME THAT!</div>
        <div className="picker picker-grid">
          <div
            className="picker-button picker-button-up"
            onClick={() =>
              setStartIndex((prev) => Math.max(prev - pageSize, 0))
            }
          >
            <TbTriangleFilled />
          </div>
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
              <GoDotFill
                key={idx}
                className={`dot${idx === activePage ? " active" : ""}`}
              />
            ))}
          </div>
          <div
            className="picker-button picker-button-down"
            onClick={() =>
              setStartIndex((prev) =>
                Math.min(prev + pageSize, (totalPages - 1) * pageSize)
              )
            }
          >
            <TbTriangleInvertedFilled />
          </div>
        </div>
        <div className="image-display">
          <img src="https://placehold.co/370x370" alt="placeholder" />
        </div>
        <div className="app-button app-button-info">
          <FaQuestion />
        </div>
        <div className="cta-button cta-button-start">START GAME</div>
        <div className="app-button app-button-settings">
          <FaGear />
        </div>
      </div>
    </div>
  );
}

export default App;
