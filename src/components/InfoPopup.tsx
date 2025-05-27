import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface InfoPopupProps {
  onClose: () => void;
}

function InfoPopup({ onClose }: InfoPopupProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/50 z-[1000]" onClick={onClose}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[894px] h-[558px] grid gap-3 rounded-[12px] p-6 bg-radial-app-content z-[1001] text-white"
        onClick={e => e.stopPropagation()}
      >
        <div className="font-black text-[32px] leading-tight tracking-normal text-center uppercase">
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
        <div className="w-[846px] h-[460px] flex flex-col items-start gap-3 rounded-[12px] p-3 bg-[#f5f5f5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.55)] text-[#5c5c5c] font-bold text-xl leading-7 tracking-normal text-left">
          <ul className="list-outside list-disc pl-[1.2em]">
            <li className="mb-7 last:mb-0">
              Make sure your sound is turned ON. If you're playing via videoconference, ensure you
              are sharing screen with sound.
            </li>
            <li className="mb-7 last:mb-0">
              Give 30–60 seconds per question before moving on to the next question. You may play
              the audio/video clip multiple times.
            </li>
            <li className="mb-7 last:mb-0">
              Players/Teams can write their answers on a piece of paper. At the end of the round,
              exchange answer sheets with another player/team for scoring (this is done to ensure
              fairness).
            </li>
            <li className="mb-7 last:mb-0">
              The Host will make all final judgement calls and their decision will be final.
            </li>
            <li className="mb-7 last:mb-0">
              (Optional) Consider making the final round worth 2x points!
            </li>
            <li className="mb-7 last:mb-0">Have a great game!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoPopup;
