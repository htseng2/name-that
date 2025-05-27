import React, { forwardRef } from 'react';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ className = '', ...props }, ref) => {
  // Base classes
  const baseClasses =
    'w-fit flex items-center justify-center justify-self-center whitespace-nowrap col-span-full row-start-1 font-shrikhand font-normal italic leading-none tracking-normal text-center uppercase text-[#fbd11e] text-stroke-logo text-shadow-logo';

  // Responsive height and text size classes
  const responsiveClasses =
    'h-[27px] text-[27px] w1194:h-[54px] w1194:text-[54px] w1920:h-[64px] w1920:text-[64px] w2560:h-[84px] w2560:text-[84px]';

  return (
    <div ref={ref} className={`${baseClasses} ${responsiveClasses} ${className}`} {...props}>
      NAME THAT!
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
