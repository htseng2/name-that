import React, { useState } from 'react';
import StartMenu from './screens/StartMenu';
import RoundIntro from './screens/RoundIntro';
import QuestionScreen from './screens/QuestionScreen';
import RevealScreen from './screens/RevealScreen';
import GameOverScreen from './screens/GameOverScreen';
import NavigationButton from './components/NavigationButton';

type Screen = 'start' | 'intro' | 'question' | 'reveal' | 'over';

interface Settings {
  rounds: number;
  questionsPerRound: number;
}

interface StartParams {
  rounds: number;
  questionsPerRound: number;
  selectedIndex: number | null;
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [round, setRound] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [settings, setSettings] = useState<Settings>({
    rounds: 2,
    questionsPerRound: 2,
  });
  const [_selectedEditionIndex, setSelectedEditionIndex] = useState<number | null>(null);
  const [roundIntroKey, setRoundIntroKey] = useState(0);
  const [showRoundIntroButton, setShowRoundIntroButton] = useState(false);

  const goTo = (next: Screen) => {
    if (next === 'intro') {
      setRoundIntroKey(prevKey => prevKey + 1);
      setShowRoundIntroButton(false);
    }
    setScreen(next);
  };

  const handleStart = ({ rounds, questionsPerRound, selectedIndex }: StartParams) => {
    setSettings({ rounds, questionsPerRound });
    setSelectedEditionIndex(selectedIndex);
    setRound(1);
    setQuestionIndex(0);
    goTo('intro');
  };

  const handleRevealNext = () => {
    if (round < settings.rounds) {
      setRound(round + 1);
      setQuestionIndex(0);
      goTo('intro');
    } else {
      goTo('over');
    }
  };

  const handleQuestionNext = () => {
    if (questionIndex + 1 < settings.questionsPerRound) {
      setQuestionIndex(questionIndex + 1);
      goTo('question');
    } else {
      goTo('reveal');
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      goTo('question');
    } else {
      goTo('intro');
    }
  };

  // Navigation button logic
  const getNavigationConfig = () => {
    switch (screen) {
      case 'intro':
        return {
          showNext: showRoundIntroButton,
          showPrevious: false,
          onNext: () => goTo('question'),
          onPrevious: () => {},
          nextLabel: 'Next Round',
          shouldBlinkNext: true,
        };
      case 'question':
        return {
          showNext: true,
          showPrevious: true,
          onNext: handleQuestionNext,
          onPrevious: handlePreviousQuestion,
          nextLabel: 'Answer Question',
          previousLabel: 'Previous Question',
          shouldBlinkNext: false,
        };
      default:
        return {
          showNext: false,
          showPrevious: false,
          onNext: () => {},
          onPrevious: () => {},
        };
    }
  };

  const navigationConfig = getNavigationConfig();

  const renderScreen = () => {
    switch (screen) {
      case 'start':
        return (
          <StartMenu
            rounds={settings.rounds}
            questionsPerRound={settings.questionsPerRound}
            onChangeRounds={r => setSettings(s => ({ ...s, rounds: r }))}
            onChangeQuestionsPerRound={q => setSettings(s => ({ ...s, questionsPerRound: q }))}
            onStart={handleStart}
          />
        );
      case 'intro':
        return (
          <RoundIntro
            key={roundIntroKey}
            round={round}
            questionsPerRound={settings.questionsPerRound}
            onAnimationComplete={() => setShowRoundIntroButton(true)}
          />
        );
      case 'question':
        return <QuestionScreen round={round} questionIndex={questionIndex} />;
      case 'reveal':
        return <RevealScreen round={round} onNext={handleRevealNext} />;
      case 'over':
        return <GameOverScreen onRestart={() => goTo('start')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-dvh min-w-dvw bg-neutral-700 font-sans box-border overflow-hidden flex justify-center items-center">
      <div
        className="relative bg-radial-app-content flex flex-col items-center overflow-y-auto flex-shrink-0 
      w-[852px] h-[393px] pt-[42px] px-[32px] pb-[32px] 
      w1194:w-[1194px] w1194:h-[834px] w1194:pt-[96px] w1194:px-[74px] w1194:pb-[64px] 
      w1280:w-[1280px] w1280:h-[1024px] w1280:p-[74px] 
      w1366:w-[1366px] w1366:h-[768px] w1366:p-[64px] 
      w1440:w-[1440px] w1440:h-[1024px] w1440:p-[72px] 
      w1920:w-[1920px] w1920:h-[1080px] w1920:p-[96px] 
      w2560:w-[2560px] w2560:h-[1440px] w2560:p-[128px]"
      >
        {/* Navigation buttons positioned at container level */}
        {navigationConfig.showPrevious && (
          <NavigationButton
            onClick={navigationConfig.onPrevious}
            show={true}
            direction="previous"
            label={navigationConfig.previousLabel}
          />
        )}
        {navigationConfig.showNext && (
          <NavigationButton
            onClick={navigationConfig.onNext}
            show={true}
            direction="next"
            label={navigationConfig.nextLabel}
            shouldBlink={navigationConfig.shouldBlinkNext}
          />
        )}

        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
