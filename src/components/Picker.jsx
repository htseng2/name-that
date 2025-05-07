import React, { useState } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import "./Picker.css";

function Picker({ options, selectedIndex, onSelect, pageSize = 6 }) {
  const [startIndex, setStartIndex] = useState(0);
  const totalPages = Math.ceil(options.length / pageSize);
  const activePage = Math.floor(startIndex / pageSize);

  return (
    <div className="picker picker-grid">
      <button
        type="button"
        className="picker-button picker-button-up"
        onClick={() => setStartIndex((prev) => Math.max(prev - pageSize, 0))}
      >
        <TbTriangleFilled />
      </button>
      <div className="edition-options">
        {options.slice(startIndex, startIndex + pageSize).map((option, idx) => {
          const globalIdx = startIndex + idx;
          return (
            <div
              key={globalIdx}
              className={`edition-option${
                selectedIndex === globalIdx ? " selected" : ""
              }`}
              onClick={() => onSelect(globalIdx)}
            >
              {option.title}
            </div>
          );
        })}
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
  );
}

export default Picker;
