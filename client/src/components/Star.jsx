import React, { useState } from "react";

function Star() {
  const [values, setValues] = useState({
    size: Math.random() * 10 + 1,
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    animationDelay: Math.random() * 7 + "s",
    animationDuration: Math.random() * 5 + 5 + "s",
    rotation: Math.random() * 360 + "deg",
  });

  return (
    <svg
      className="absolute animate-twinkle"
      style={{
        width: values.size + "px",
        height: values.size + "px",
        top: values.top,
        left: values.left,
        animationDelay: values.animationDelay,
        animationDuration: values.animationDuration,
        transform: `rotate(${values.rotation})`,
      }}
      viewBox="0 0 24 24"
      fill="white"
    >
      <polygon
        points="12,2 15,10 24,10 17,15 20,24 12,18 4,24 7,15 0,10 9,10"
        style={{
          fill: "url(#star-gradient)",
          filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))",
        }}
      />
      <defs>
        <radialGradient id="star-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor="white" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default Star;
