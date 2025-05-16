import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
// import "./RoundSelector.css"; // Removed CSS import

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
    <div className="py-2 px-4 flex items-center justify-between w-[100px] h-9 rounded-lg bg-neutral-200">
      <button
        type="button"
        className="w-6 h-6 flex items-center justify-center bg-neutral-200 text-neutral-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={dec}
        disabled={value <= min}
      >
        <FaMinus />
      </button>
      <span className="font-sans font-bold text-sm leading-none w-10 text-center text-neutral-600">
        {value}
      </span>
      <button
        type="button"
        className="w-6 h-6 flex items-center justify-center bg-neutral-200 text-neutral-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={inc}
        disabled={value >= max}
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default RoundSelector;
