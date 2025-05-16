import React, { useState } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";

function EditionPicker({ options, selectedIndex, onSelect, pageSize = 6 }) {
  const [startIndex, setStartIndex] = useState(0);
  const totalPages = Math.ceil(options.length / pageSize);
  const activePage = Math.floor(startIndex / pageSize);

  const pickerButtonBase =
    "flex items-center justify-center w-12 h-10 bg-[#053b60] rounded-[12px] text-white cursor-pointer active:text-[#fbd11e]";
  const editionOptionBase =
    "font-black text-2xl leading-none tracking-normal capitalize w-[370px] h-[37px] py-1 flex items-center justify-center cursor-pointer text-[#053b60]";

  return (
    <div className="col-start-1 col-span-3 row-start-2 justify-self-center self-center grid grid-cols-[1fr_auto] grid-rows-[auto_auto_auto] gap-4 w-[360px]">
      <button
        type="button"
        className={`${pickerButtonBase} col-span-full row-start-1 justify-self-center self-center`}
        onClick={() => setStartIndex((prev) => Math.max(prev - pageSize, 0))}
      >
        <TbTriangleFilled className="text-xl" />
      </button>
      <div className="col-start-1 col-span-1 row-start-2 flex flex-col gap-2 justify-self-center self-center">
        {options.slice(startIndex, startIndex + pageSize).map((option, idx) => {
          const globalIdx = startIndex + idx;
          const isSelected = selectedIndex === globalIdx;
          return (
            <div
              key={globalIdx}
              className={`${editionOptionBase} ${
                isSelected
                  ? "bg-[#053b60] text-[#fbd11e]"
                  : "hover:bg-[#053b60] hover:text-white active:bg-[#053b60] active:text-[#fbd11e]"
              }`}
              onClick={() => onSelect(globalIdx)}
            >
              {option.title}
            </div>
          );
        })}
      </div>
      <div className="col-start-2 col-span-1 row-start-2 flex flex-col justify-center items-center gap-1">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`cursor-pointer ${
              idx === activePage ? "text-[#053b60]" : "text-[#d9d9d9]"
            }`}
            onClick={() => setStartIndex(idx * pageSize)}
          >
            <GoDotFill className="text-sm" />
          </button>
        ))}
      </div>
      <button
        type="button"
        className={`${pickerButtonBase} col-span-full row-start-3 justify-self-center self-center`}
        onClick={() =>
          setStartIndex((prev) =>
            Math.min(prev + pageSize, (totalPages - 1) * pageSize)
          )
        }
      >
        <TbTriangleInvertedFilled className="text-xl" />
      </button>
    </div>
  );
}

export default EditionPicker;
