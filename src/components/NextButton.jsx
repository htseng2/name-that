import React, { useEffect, useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import { useSpring, animated as Animated } from "react-spring";
import "./NextButton.css";

function NextButton({ onClick, show }) {
  const [animationStyle, api] = useSpring(() => ({
    opacity: 0,
    config: { duration: 300 },
  }));
  const [blinkActive, setBlinkActive] = useState(false);

  useEffect(() => {
    if (show) {
      api.start({
        to: { opacity: 1 },
        delay: 500,
        onRest: () => {
          setBlinkActive(true);
        },
      });
    }
  }, [show, api]);

  return (
    <Animated.button
      type="button"
      className={`next-button-container${blinkActive ? " blink" : ""}`}
      onClick={onClick}
      style={animationStyle}
      aria-label="Next"
    >
      <TbTriangleFilled />
    </Animated.button>
  );
}

export default NextButton;
