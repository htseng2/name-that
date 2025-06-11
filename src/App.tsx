import React, { useState } from 'react';
import StartMenu from './screens/StartMenu';
import RoundIntro from './screens/RoundIntro';
import QuestionScreen from './screens/QuestionScreen';
import RevealScreen from './screens/RevealScreen';
import GameOverScreen from './screens/GameOverScreen';
import NavigationButton from './components/NavigationButton';
import { QUESTIONS_DATABASE } from './constants';

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
  const [selectedEditionIndex, setSelectedEditionIndex] = useState<number | null>(null);
  const [roundIntroKey, setRoundIntroKey] = useState(0);
  const [showRoundIntroButton, setShowRoundIntroButton] = useState(false);
  const [showRevealButtons, setShowRevealButtons] = useState(false);
  const [showQuestionButtons, setShowQuestionButtons] = useState(false);
  const [gameQuestions, setGameQuestions] = useState<typeof QUESTIONS_DATABASE>([]);
  const [allRoundsQuestions, setAllRoundsQuestions] = useState<(typeof QUESTIONS_DATABASE)[]>([]);

  // Utility function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const goTo = (next: Screen) => {
    // Reset all navigation button states
    setShowRoundIntroButton(false);
    setShowRevealButtons(false);
    setShowQuestionButtons(false);

    if (next === 'intro') {
      setRoundIntroKey(prevKey => prevKey + 1);
    }
    setScreen(next);
  };

  const handleStart = ({ rounds, questionsPerRound, selectedIndex }: StartParams) => {
    setSettings({ rounds, questionsPerRound });
    setSelectedEditionIndex(selectedIndex);
    setRound(1);
    setQuestionIndex(0);

    // Shuffle the entire question database once
    const shuffledDatabase = shuffleArray(QUESTIONS_DATABASE);

    // Create question sets for all rounds
    const newAllRoundsQuestions: (typeof QUESTIONS_DATABASE)[] = [];
    let remaining = [...shuffledDatabase];

    for (let i = 0; i < rounds; i++) {
      const roundQuestions = remaining.slice(0, questionsPerRound);
      newAllRoundsQuestions.push(roundQuestions);
      remaining = remaining.slice(questionsPerRound);
    }

    setAllRoundsQuestions(newAllRoundsQuestions);
    setGameQuestions(newAllRoundsQuestions[0] || []);

    goTo('intro');
  };

  const handleRevealNext = () => {
    if (round < settings.rounds) {
      setRound(round + 1);
      setQuestionIndex(0);

      // Set questions for the next round
      setGameQuestions(allRoundsQuestions[round] || []);

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
      // Go to previous question in the same round
      setQuestionIndex(questionIndex - 1);
      goTo('question');
    } else if (round > 1) {
      // Go to the last question of the previous round
      const prevRound = round - 1;
      setRound(prevRound);
      setGameQuestions(allRoundsQuestions[prevRound - 1] || []);
      setQuestionIndex(settings.questionsPerRound - 1);
      goTo('question');
    } else {
      // We're on the first question of the first round, go back to intro
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
        // Only show previous button if we're not on the very first question of the game
        const isFirstQuestionOfGame = round === 1 && questionIndex === 0;
        return {
          showNext: showQuestionButtons,
          showPrevious: showQuestionButtons && !isFirstQuestionOfGame,
          onNext: handleQuestionNext,
          onPrevious: handlePreviousQuestion,
          nextLabel: 'Answer Question',
          previousLabel: 'Previous Question',
          shouldBlinkNext: false,
        };
      case 'reveal':
        return {
          showNext: showRevealButtons,
          showPrevious: showRevealButtons,
          onNext: handleRevealNext,
          onPrevious: () => {
            // Go back to the last question of the current round
            setQuestionIndex(settings.questionsPerRound - 1);
            goTo('question');
          },
          nextLabel: round < settings.rounds ? 'Next Round' : 'Game Over',
          previousLabel: 'Back to Questions',
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
            previouslySelectedIndex={selectedEditionIndex}
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
        return (
          <QuestionScreen
            round={round}
            questionIndex={questionIndex}
            gameQuestions={gameQuestions}
            onReady={() => setShowQuestionButtons(true)}
          />
        );
      case 'reveal':
        return (
          <RevealScreen
            round={round}
            questionsPerRound={settings.questionsPerRound}
            gameQuestions={gameQuestions}
            onNext={handleRevealNext}
            onReady={() => setShowRevealButtons(true)}
          />
        );
      case 'over':
        return <GameOverScreen onRestart={() => goTo('start')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-dvh min-w-dvw bg-neutral-700 font-sans box-border overflow-hidden flex justify-center items-center">
      <div
        className="relative bg-radial-app-content flex flex-col items-center overflow-y-auto overflow-x-hidden flex-shrink-0 
      w-[852px] h-[393px] 
      w1194:w-[1194px] w1194:h-[834px] 
      w1280:w-[1280px] w1280:h-[1024px] 
      w1366:w-[1366px] w1366:h-[768px] 
      w1440:w-[1440px] w1440:h-[1024px] 
      w1920:w-[1920px] w1920:h-[1080px] 
      w2560:w-[2560px] w2560:h-[1440px]"
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
