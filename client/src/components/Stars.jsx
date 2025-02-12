import React, { useEffect } from "react";
import Meteors from "./Meteors";
import Star from "./Star";

const Stars = () => {
  useEffect(() => {
    console.log("Time");
  }, []);
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 600 }).map((_, i) => (
        <Star key={i} />
      ))}
      <Meteors />
    </div>
  );
};

export default Stars;
