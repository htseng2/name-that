import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import "./RoundIntro.css";
import NextButton from "../components/NextButton";

// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from "react-spring";

function RoundIntro({ round, onNext, questionsPerRound }) {
  const [logoAnimation, api] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(50vh) scale(1)",
    config: { tension: 120, friction: 14 },
  }));

  const [bannerAnimation, bannerApi] = useSpring(() => ({
    x: "-100vw",
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
    <div className="round-intro-screen">
      <NextButton onClick={onNext} show={showNextButton} />
      <animated.div style={logoAnimation}>
        <Logo />
      </animated.div>
      <h2>Round {round}</h2>
      <button type="button" onClick={onNext}>
        Start Round
      </button>
      <animated.div
        className="round-banner"
        style={{
          ...bannerAnimation,
          transform: bannerAnimation.x.to(
            (x) => `rotate(-1.96deg) translate(-50%, -50%) translateX(${x})`
          ),
        }}
      >
        <div className="round-intro-text">ROUND {round}</div>
      </animated.div>
      <animated.div
        className="questions-count-text"
        style={questionsTextAnimation}
      >
        {questionsPerRound} Questions
      </animated.div>
    </div>
  );
}

export default RoundIntro;
