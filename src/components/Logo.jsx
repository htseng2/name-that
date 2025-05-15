import React, { forwardRef } from "react";
import "./Logo.css";

const Logo = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <div ref={ref} className={`logo ${className}`} {...props}>
      NAME THAT!
    </div>
  );
});

export default Logo;
