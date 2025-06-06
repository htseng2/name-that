import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface InfoPopupProps {
  onClose: () => void;
}

function InfoPopup({ onClose }: InfoPopupProps) {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 z-[1000]
      w-[852px] h-[393px]
      w1194:w-[1194px] w1194:h-[834px]
      w1280:w-[1280px] w1280:h-[1024px]
      w1366:w-[1366px] w1366:h-[768px]
      w1440:w-[1440px] w1440:h-[1024px]
      w1920:w-[1920px] w1920:h-[1080px]
      w2560:w-[2560px] w2560:h-[1440px]"
      onClick={onClose}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-[12px] p-6 bg-radial-app-content z-[1001] text-white
        w-[820px] h-[361px]
        w1194:w-[1162px] w1194:h-[802px]
        w1280:w-[1248px] w1280:h-[992px]
        w1366:w-[1334px] w1366:h-[736px]
        w1440:w-[1408px] w1440:h-[992px]
        w1920:w-[1888px] w1920:h-[1048px]
        w2560:w-[2528px] w2560:h-[1408px]"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="font-black leading-tight tracking-normal text-center uppercase mb-3
        text-[32px]
        w1194:text-[40px] w1194:mb-4
        w1280:text-[42px] w1280:mb-4
        w1366:text-[40px] w1366:mb-3
        w1440:text-[48px] w1440:mb-5
        w1920:text-[56px] w1920:mb-6
        w2560:text-[72px] w2560:mb-8"
        >
          INSTRUCTIONS
        </div>
        <button
          type="button"
          className="absolute top-4 right-4 w-8 h-8 text-3xl text-white flex items-center justify-center cursor-pointer"
          onClick={onClose}
          aria-label="Close info popup"
        >
          <FaTimes />
        </button>
        <div className="flex-1 flex items-center justify-center">
          <div
            className="rounded-[12px] p-3 bg-[#f5f5f5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] text-[#5c5c5c] font-bold leading-7 tracking-normal text-left
          text-sm
          w1194:text-2xl
          w1280:text-2xl
          w1366:text-[22px]
          w1440:text-[28px]
          w1920:text-[32px]
          w2560:text-[40px]"
          >
            <ul className="list-outside list-disc pl-[1.2em]">
              <li className="mb-0 w1194:mb-5 w1280:mb-5 w1366:mb-4 w1440:mb-6 w1920:mb-7 w2560:mb-8 last:mb-0">
                Make sure your sound is turned ON. If you're playing via videoconference, ensure you
                are sharing screen with sound.
              </li>
              <li className="mb-0 w1194:mb-5 w1280:mb-5 w1366:mb-4 w1440:mb-6 w1920:mb-7 w2560:mb-8 last:mb-0">
                Give 30–60 seconds per question before moving on to the next question. You may play
                the audio/video clip multiple times.
              </li>
              <li className="mb-0 w1194:mb-5 w1280:mb-5 w1366:mb-4 w1440:mb-6 w1920:mb-7 w2560:mb-8 last:mb-0">
                Players/Teams can write their answers on a piece of paper. At the end of the round,
                exchange answer sheets with another player/team for scoring (this is done to ensure
                fairness).
              </li>
              <li className="mb-0 w1194:mb-5 w1280:mb-5 w1366:mb-4 w1440:mb-6 w1920:mb-7 w2560:mb-8 last:mb-0">
                The Host will make all final judgement calls and their decision will be final.
              </li>
              <li className="mb-0 w1194:mb-5 w1280:mb-5 w1366:mb-4 w1440:mb-6 w1920:mb-7 w2560:mb-8 last:mb-0">
                (Optional) Consider making the final round worth 2x points!
              </li>
              <li className="mb-0 w1194:mb-5 w1280:mb-5 w1366:mb-4 w1440:mb-6 w1920:mb-7 w2560:mb-8 last:mb-0">
                Have a great game!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPopup;
