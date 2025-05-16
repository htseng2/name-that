import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
// import "./RoundIntro.css"; // Remove this import
import NavigationButton from "../components/NavigationButton";

// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from "react-spring";

function RoundIntro({ round, onNext, questionsPerRound }) {
  const [logoAnimation, api] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(50vh) scale(1)", // This transform is handled by react-spring
    config: { tension: 120, friction: 14 },
  }));

  const [bannerAnimation, bannerApi] = useSpring(() => ({
    x: "-100vw", // react-spring controls horizontal movement
    opacity: 0,
    config: { tension: 120, friction: 14 },
  }));

  const [questionsTextAnimation, questionsTextApi] = useSpring(() => ({
    opacity: 0,
    config: { duration: 500 },
  }));

  // State to control when to show the NextButton
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    api.start({
      to: {
        opacity: 1,
        transform: "translateY(0px) scale(1)",
      },
      onRest: () => {
        // Animate the banner with a 500ms delay after the logo finishes
        bannerApi.start({
          to: { x: "0vw", opacity: 1 },
          delay: 500,
          onRest: () => {
            // Fade in the questions text immediately after the banner finishes
            questionsTextApi.start({
              to: { opacity: 1 },
              onRest: () => {
                // Show the NextButton after all text animation finishes
                setShowNextButton(true);
              },
            });
          },
        });
      },
    });
  }, [api, bannerApi, questionsTextApi]);

  return (
    // Added relative, w-full, h-full for positioning context and to fill parent
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
          // react-spring combines its x translation with the base Tailwind transform (rotation)
          // The translate(-50%, -50%) is effectively part of the left-1/2 top-1/2 and react-spring translateX
          transform: bannerAnimation.x.to(
            (x) => `translate(-50%, -50%) rotate(-1.96deg) translateX(${x})`
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
