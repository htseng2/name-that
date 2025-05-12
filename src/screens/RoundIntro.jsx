import React, { useEffect } from "react";
import Logo from "../components/Logo";
import "./RoundIntro.css";
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from "react-spring";

function RoundIntro({ round, onNext, questionsPerRound }) {
  const [logoAnimation, api] = useSpring(() => ({
    opacity: 1,
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

  useEffect(() => {
    api.start({
      to: {
        opacity: 1,
        transform: "translateY(0px) scale(1)",
      },
    });
    // Animate the box after the logo animation completes (delay ~500ms)
    const timeout = setTimeout(() => {
      bannerApi.start({
        to: { x: "0vw", opacity: 1 },
        onRest: () => {
          questionsTextApi.start({ to: { opacity: 1 } });
        },
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [api, bannerApi, questionsTextApi]);

  return (
    <div className="round-intro-screen">
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
