import React, { useState } from 'react';
import RoundSelector from './RoundSelector';

interface SettingsPopupProps {
  rounds: number;
  questionsPerRound: number;
  onChangeRounds: (value: number) => void;
  onChangeQuestionsPerRound: (value: number) => void;
  onClose: () => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({
  rounds,
  questionsPerRound,
  onChangeRounds,
  onChangeQuestionsPerRound,
  onClose,
}) => {
  const [closing, setClosing] = useState<boolean>(false);

  const handleClose = (): void => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      // No need to setClosing(false) here if the component unmounts after onClose
    }, 300); // Corresponds to animation duration
  };

  const settingsPopupBaseClasses =
    'fixed top-0 right-0 w-[320px] h-[752px] py-8 px-6 flex flex-col items-center gap-8 bg-[#024d80] rounded-l-[32px] border-r border-black/15 shadow-[-2px_2px_23.1px_2px_rgba(0,0,0,0.15)] z-[1002]';

  return (
    // Popup overlay from App.css, now with Tailwind
    <div className="fixed inset-0 w-screen h-screen bg-black/50 z-[1000]" onClick={handleClose}>
      <div
        className={`${settingsPopupBaseClasses} ${
          closing ? 'animate-slideOut' : 'animate-slideIn'
        }`}
        onClick={e => e.stopPropagation()} // Prevent click from bubbling to overlay
      >
        <div>
          {' '}
          {/* Grouping title and divider */}
          <div className="font-black text-2xl leading-none tracking-normal text-center capitalize text-white">
            Settings
          </div>
          <div className="w-[286px] border-t border-white/30 mt-6 mx-auto" />
        </div>
        <div className="w-[272px] gap-6 flex flex-col">
          {' '}
          {/* settings-popup-content */}
          <div className="flex w-[272px] min-h-[36px] justify-between items-center">
            {' '}
            {/* settings-popup-content-item */}
            <div className="flex flex-col items-start">
              {' '}
              {/* settings-popup-content-item-info */}
              <div className="font-bold text-sm leading-none tracking-normal text-white">
                Rounds
              </div>
              <div className="font-bold text-xs leading-none tracking-normal text-[#fbd11e]">
                (Max = 4 Rounds)
              </div>
            </div>
            <RoundSelector min={1} max={4} initial={rounds} onChange={onChangeRounds} />
          </div>
          <div className="flex w-[272px] min-h-[36px] justify-between items-center">
            {' '}
            {/* settings-popup-content-item */}
            <div className="flex flex-col items-start">
              {' '}
              {/* settings-popup-content-item-info */}
              <div className="font-bold text-sm leading-none tracking-normal text-white">
                Questions Per Round
              </div>
              <div className="font-bold text-xs leading-none tracking-normal text-[#fbd11e]">
                (Max = 10 Questions)
              </div>
            </div>
            <RoundSelector
              min={1}
              max={10}
              initial={questionsPerRound}
              onChange={onChangeQuestionsPerRound}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;
