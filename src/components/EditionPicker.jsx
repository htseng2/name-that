import React, { useState } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";

function EditionPicker({ options, selectedIndex, onSelect, pageSize = 6 }) {
  const [startIndex, setStartIndex] = useState(0);
  const totalPages = Math.ceil(options.length / pageSize);
  const activePage = Math.floor(startIndex / pageSize);

  const pickerButtonBase =
    "flex items-center justify-center bg-[#053b60] text-white cursor-pointer active:text-[#fbd11e] border-0 " +
    "box-border w-[24px] h-[20px] rounded-[6px] p-[4px] " +
    "w1194:w-[48px] w1194:h-[40px] w1194:rounded-[12px] w1194:p-[8px] " +
    "w1280:w-[48px] w1280:h-[42px] w1280:rounded-[12px] w1280:p-[8px] " +
    "w1366:w-[48px] w1366:h-[40px] w1366:rounded-[12px] w1366:p-[8px] " +
    "w1440:w-[72px] w1440:h-[60px] w1440:rounded-[18px] w1440:p-[12px] " +
    "w1920:w-[72px] w1920:h-[60px] w1920:rounded-[18px] w1920:p-[12px] " +
    "w2560:w-[86px] w2560:h-[72px] w2560:rounded-[22px] w2560:p-[14px]";
  const editionOptionBase =
    "font-black text-2xl leading-none tracking-normal capitalize w-[370px] h-[37px] py-1 flex items-center justify-center cursor-pointer text-[#053b60]";

  return (
    <div className="col-start-1 col-span-3 row-start-2 justify-self-center self-center grid grid-cols-[1fr_auto] grid-rows-[auto_auto_auto] gap-4 w-[360px]">
      <button
        type="button"
        className={`${pickerButtonBase} col-span-full row-start-1 justify-self-center self-center`}
        onClick={() => setStartIndex((prev) => Math.max(prev - pageSize, 0))}
      >
        <TbTriangleFilled
          className={`
            w-[16px] h-[12px]
            w1194:w-[32px] w1194:h-[24px]
            w1280:w-[32px] w1280:h-[24px]
            w1366:w-[32px] w1366:h-[24px]
            w1440:w-[48px] w1440:h-[36px]
            w1920:w-[48px] w1920:h-[36px]
            w2560:w-[57px] w2560:h-[43px]
          `}
        />
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
        <TbTriangleInvertedFilled
          className={`
            w-[16px] h-[12px]
            w1194:w-[32px] w1194:h-[24px]
            w1280:w-[32px] w1280:h-[24px]
            w1366:w-[32px] w1366:h-[24px]
            w1440:w-[48px] w1440:h-[36px]
            w1920:w-[48px] w1920:h-[36px]
            w2560:w-[57px] w2560:h-[43px]
          `}
        />
      </button>
    </div>
  );
}

export default EditionPicker;
