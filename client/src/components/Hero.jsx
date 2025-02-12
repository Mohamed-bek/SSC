import React from "react";

function Hero() {
  return (
    <div className="relative z-10 min-h-[calc(100dvh-82px)] flex items-center justify-center px-4 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-[50px] left-[100px] w-[600px] h-[600px] 
          bg-primaryTransparent rounded-full blur-[110px]"
        ></div>
        <div
          className="absolute bottom-[-300px] right-[400px] w-[700px] h-[700px] 
          bg-[#0d07bd40] z-10 rounded-full blur-[110px]"
        ></div>
        <div
          className="absolute -top-44 right-[100px] w-[700px] h-[700px] 
          bg-[#c514da3b] z-10 rounded-full blur-[110px]"
        ></div>
      </div>
      <div className="text-center h-fit pt-24 px-10 p-20 relative z-40">
        <h2 className="text-[3rem] md:text-[4.5rem] flex items-center justify-center mx-auto mb-5 font-light scale-y-[2] tracking-wider Header font-luckiest text-primary">
          {"Start Coding Club".split("").map((letter, i) => (
            <span
              key={i}
              style={{ animationDelay: `${50 * i + 500}ms` }}
              className={`HeaderAnimation translate-y-[100px] opacity-0 ${
                letter === "i" && "CircleEffect"
              }`}
            >
              {letter === " " ? "\u00A0" : letter}{" "}
            </span>
          ))}
        </h2>
        <h3 className="text-3xl text-secondary tracking-wide font-bold uppercase  mb-5 -mt-4">
          Where Innovation Fuels the Next Generation
        </h3>
        <p className="text-sm md:text-xl  font-semibold text-secondary  max-w-5xl mx-auto capitalize md:leading-7">
          Welcome to the Start Coding Club – where creativity meets code! 🚀
          Dive into an empowering community of learners and innovators mastering
          programming, design, networking, freelancing, and client skills.
          Whether you're starting fresh or sharpening your expertise, we’re here
          to help you unlock your potential and build a future fueled by
          technology!
        </p>
      </div>
    </div>
  );
}

export default Hero;
