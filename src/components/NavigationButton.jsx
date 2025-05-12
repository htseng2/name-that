import React, { useEffect, useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import { useSpring, animated as Animated } from "react-spring";
import "./NavigationButton.css";

function NavigationButton({
  onClick,
  show,
  direction = "next", // "next" or "previous"
  label,
}) {
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

  // Infer position from direction
  const position = direction === "next" ? "right" : "left";

  // Calculate rotation angle based on direction
  const rotationAngle = direction === "next" ? 90 : -90;

  return (
    <Animated.button
      type="button"
      className={`navigation-button ${direction} ${position}${
        blinkActive ? " blink" : ""
      }`}
      onClick={onClick}
      style={animationStyle}
      aria-label={label || (direction === "next" ? "Next" : "Previous")}
    >
      <TbTriangleFilled style={{ transform: `rotate(${rotationAngle}deg)` }} />
    </Animated.button>
  );
}

export default NavigationButton;
