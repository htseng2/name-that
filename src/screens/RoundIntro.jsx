import React, { useEffect } from "react";
import Logo from "../components/Logo";
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from "react-spring";

function RoundIntro({ round, onNext }) {
  const [logoAnimation, api] = useSpring(() => ({
    opacity: 1,
    transform: "translateY(50vh) scale(1)",
    config: { tension: 120, friction: 14 },
  }));

  useEffect(() => {
    api.start({
      to: {
        opacity: 1,
        transform: "translateY(0px) scale(1)",
      },
    });
  }, [api]);

  return (
    <div className="round-intro-screen">
      <animated.div style={logoAnimation}>
        <Logo />
      </animated.div>
      <h2>Round {round}</h2>
      <button type="button" onClick={onNext}>
        Start Round
      </button>
    </div>
  );
}

export default RoundIntro;
