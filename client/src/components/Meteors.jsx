import React from "react";

const MeteorAnimation = () => {
  const meteors = Array.from({ length: 15 }, (_, i) => {
    const randomLeft = Math.floor(Math.random() * 90) + 9;
    const randomTop = Math.floor(Math.random() * 250) + 50;
    const randomDuration = Math.floor(Math.random() * 70) / 10 + 5;

    return (
      <div
        key={i}
        className="meteor"
        style={{
          top: `${randomTop}px`,
          left: `${randomLeft}%`,
          animationDuration: `${randomDuration}s`,
        }}
      />
    );
  });

  return (
    <div className="meteor-container">
      <div className="star" />
      {meteors}
    </div>
  );
};

export default MeteorAnimation;
