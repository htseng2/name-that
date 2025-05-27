import React, { useState, useRef } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import Logo from '../components/Logo';
import EditionPicker from '../components/EditionPicker';
import EditionDisplay from '../components/EditionDisplay';
import SettingsPopup from '../components/SettingsPopup';
import InfoPopup from '../components/InfoPopup';
import { EDITION_OPTIONS } from '../constants';

interface StartMenuProps {
  onStart: (params: {
    rounds: number;
    questionsPerRound: number;
    selectedIndex: number | null;
  }) => void;
  rounds: number;
  questionsPerRound: number;
  onChangeRounds: (rounds: number) => void;
  onChangeQuestionsPerRound: (questions: number) => void;
}

function StartMenu({
  onStart,
  rounds,
  questionsPerRound,
  onChangeRounds,
  onChangeQuestionsPerRound,
}: StartMenuProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const pageSize = 6;
  const [showInfo, setShowInfo] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isStartDisabled = selectedIndex === null || !EDITION_OPTIONS[selectedIndex]?.img;

  const handleStart = () => {
    if (isStartDisabled || isAnimating || !logoRef.current) return;
    setIsAnimating(true);
    const logoEl = logoRef.current;
    const rect = logoEl.getBoundingClientRect();
    const scale = 64 / rect.height;

    const clone = logoEl.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '1000';
    clone.style.transition = 'transform 0.5s ease';
    document.body.appendChild(clone);

    logoEl.style.visibility = 'hidden';

    const dx = window.innerWidth / 2 - rect.left - rect.width / 2;
    const dy = window.innerHeight / 2 - rect.top - rect.height / 2;

    clone.getBoundingClientRect();

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    });

    setTimeout(() => {
      onStart({ rounds, questionsPerRound, selectedIndex });
      document.body.removeChild(clone);
    }, 500);
  };

  return (
    <div
      className="grid items-center grid-rows-[27px_1fr_36px] grid-cols-6 gap-4 w-full h-full
      w1194:grid-rows-[52px_1fr_50px] w1194:gap-y-[92px]
      w1280:grid-rows-[54px_1fr_50px] w1280:gap-y-[142px]
      w1366:grid-rows-[54px_1fr_50px] w1366:gap-y-[83px]
      w1440:grid-rows-[52px_1fr_50px] w1440:gap-y-[142px]
      w1920:grid-rows-[64px_1fr_64px] w1920:gap-y-[110px]
      w2560:grid-rows-[84px_1fr_84px] w2560:gap-y-[165px]"
    >
      <Logo ref={logoRef} />
      <EditionPicker
        options={EDITION_OPTIONS}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        pageSize={pageSize}
      />
      <EditionDisplay
        edition={selectedIndex !== null ? EDITION_OPTIONS[selectedIndex] : undefined}
      />
      <button
        type="button"
        className="bg-gradient-to-b from-[#a2d5ec] to-[#6a99ae] shadow-[0px_5.6px_5.6px_0px_rgba(0,0,0,0.25)] w-[50px] h-[50px] rounded-[8px] flex items-center justify-center cursor-pointer active:brightness-80 active:shadow-[0px_2.8px_2.8px_0px_rgba(0,0,0,0.25)] col-start-1 row-start-3 justify-self-start"
        onClick={() => setShowInfo(true)}
      >
        <FaQuestion className="text-white text-2xl" />
      </button>
      <button
        type="button"
        className="w-[216px] h-[50px] px-6 py-3 rounded-[8px] bg-gradient-to-b from-[#66ed18] to-[#0e890e] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center justify-center font-black text-2xl leading-none tracking-normal text-white active:bg-blend-overlay active:shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)] active:[background:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,#66ed18_-33.77%,#0e890e_107.78%)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none col-start-3 col-span-2 row-start-3 justify-self-center self-center"
        disabled={isStartDisabled || isAnimating}
        onClick={handleStart}
      >
        START GAME
      </button>
      <button
        type="button"
        className="bg-gradient-to-b from-[#a2d5ec] to-[#6a99ae] shadow-[0px_5.6px_5.6px_0px_rgba(0,0,0,0.25)] w-[50px] h-[50px] rounded-[8px] flex items-center justify-center cursor-pointer active:brightness-80 active:shadow-[0px_2.8px_2.8px_0px_rgba(0,0,0,0.25)] col-start-6 row-start-3 justify-self-end"
        onClick={() => setShowSettings(true)}
      >
        <FaGear className="text-white text-2xl" />
      </button>

      {showSettings && (
        <SettingsPopup
          rounds={rounds}
          questionsPerRound={questionsPerRound}
          onChangeRounds={onChangeRounds}
          onChangeQuestionsPerRound={onChangeQuestionsPerRound}
          onClose={() => setShowSettings(false)}
        />
      )}
      {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}
    </div>
  );
}

export default StartMenu;
