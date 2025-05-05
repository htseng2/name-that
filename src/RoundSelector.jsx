import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./RoundSelector.css";

function RoundSelector({ min = 1, max = 10, initial = 1, onChange }) {
  const [value, setValue] = useState(initial);

  const dec = () => {
    setValue((prev) => {
      const next = Math.max(prev - 1, min);
      onChange?.(next);
      return next;
    });
  };

  const inc = () => {
    setValue((prev) => {
      const next = Math.min(prev + 1, max);
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="round-selector">
      <button
        type="button"
        className="round-selector-button"
        onClick={dec}
        disabled={value <= min}
      >
        <FaMinus />
      </button>
      <span className="round-selector-value">{value}</span>
      <button
        type="button"
        className="round-selector-button"
        onClick={inc}
        disabled={value >= max}
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default RoundSelector;
