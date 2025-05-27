import React, { useEffect, useState } from 'react';
import { TbTriangleFilled } from 'react-icons/tb';
import { useSpring, animated as Animated } from 'react-spring';

interface NavigationButtonProps {
  onClick: () => void;
  show: boolean;
  direction?: 'next' | 'previous';
  label?: string;
  shouldBlink?: boolean;
}

function NavigationButton({
  onClick,
  show,
  direction = 'next',
  label,
  shouldBlink = false,
}: NavigationButtonProps) {
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
          if (shouldBlink) {
            setBlinkActive(true);
          }
        },
      });
    }
  }, [show, api, shouldBlink]);

  const isNext = direction === 'next';
  const rotationAngle = isNext ? 90 : -90;

  const baseClasses =
    'absolute w-[76px] h-[72px] gap-2.5 bg-gradient-to-b from-[#fbd11e] to-[#8c761a] shadow-[inset_3px_-2px_4px_0px_rgba(103,103,103,0.25),inset_0px_3px_3.4px_0px_rgba(140,118,26,0.65),inset_3px_-2px_4px_0px_rgba(144,144,144,0.25),inset_-2px_0px_4px_0px_rgba(92,92,92,0.25),1px_4px_0px_0px_#625312] flex items-center justify-center cursor-pointer transition-transform duration-150 ease-in-out box-border z-[1000] hover:scale-105 active:scale-95';

  let positionClasses = '';
  if (isNext) {
    positionClasses = 'top-0 right-0 rounded-bl-[50px] pt-4 pr-4 pb-6 pl-8';
  } else {
    positionClasses = 'top-0 left-0 rounded-br-[50px] pt-4 pr-8 pb-6 pl-4';
  }

  const blinkClass = blinkActive ? 'animate-buttonBlink' : '';

  return (
    <Animated.button
      type="button"
      className={`${baseClasses} ${positionClasses} ${blinkClass}`.trim()}
      onClick={onClick}
      style={animationStyle}
      aria-label={label || (isNext ? 'Next' : 'Previous')}
    >
      <TbTriangleFilled
        className="w-8 h-8 text-white"
        style={{ transform: `rotate(${rotationAngle}deg)` }}
      />
    </Animated.button>
  );
}

export default NavigationButton;
