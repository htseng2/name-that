import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo.tsx';
import NavigationButton from '../components/NavigationButton';
import { useSpring, animated } from 'react-spring';

interface RoundIntroProps {
  round: number;
  onNext: () => void;
  questionsPerRound: number;
}

function RoundIntro({ round, onNext, questionsPerRound }: RoundIntroProps) {
  const [logoAnimation, api] = useSpring(() => ({
    opacity: 0,
    transform: 'translateY(50vh) scale(1)',
    config: { tension: 120, friction: 14 },
  }));

  const [bannerAnimation, bannerApi] = useSpring(() => ({
    x: '-100vw',
    opacity: 0,
    config: { tension: 120, friction: 14 },
  }));

  const [questionsTextAnimation, questionsTextApi] = useSpring(() => ({
    opacity: 0,
    config: { duration: 500 },
  }));

  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    api.start({
      to: {
        opacity: 1,
        transform: 'translateY(0px) scale(1)',
      },
      onRest: () => {
        bannerApi.start({
          to: { x: '0vw', opacity: 1 },
          delay: 500,
          onRest: () => {
            questionsTextApi.start({
              to: { opacity: 1 },
              onRest: () => {
                setShowNextButton(true);
              },
            });
          },
        });
      },
    });
  }, [api, bannerApi, questionsTextApi]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <NavigationButton
        onClick={onNext}
        show={showNextButton}
        direction="next"
        label="Next Round"
        shouldBlink={true}
      />
      <animated.div style={logoAnimation}>
        <Logo />
      </animated.div>
      <animated.div
        className="absolute left-1/2 top-1/2 -rotate-[1.96deg] w-[1551.93px] h-[226.15px] rounded-tr-[25px] rounded-br-[25px] py-3 px-[42px] gap-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] flex items-center justify-center"
        style={{
          ...bannerAnimation,
          transform: bannerAnimation.x.to(
            x => `translate(-50%, -50%) rotate(-1.96deg) translateX(${x})`
          ),
        }}
      >
        <div className="w-[573.46px] h-[96.14px] font-black text-[96px] leading-[96px] tracking-normal text-center text-[#525252] flex items-center justify-center">
          ROUND {round}
        </div>
      </animated.div>
      <animated.div
        className="absolute bottom-[97px] left-1/2 -translate-x-1/2 w-[370px] h-[44px] font-black text-4xl leading-none tracking-normal text-center capitalize text-white flex items-center justify-center"
        style={questionsTextAnimation}
      >
        {questionsPerRound} Questions
      </animated.div>
    </div>
  );
}

export default RoundIntro;
