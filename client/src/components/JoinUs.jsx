import React, { useEffect, useRef } from "react";
import CustomButton from "./CustomButton";

function JoinUs() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);
  return (
    <div className=" relative h-fit lg:min-h-dvh md:h-dvh md:pl-[10%] w-full bg-therd flex items-center pb-10 pt-20 text-secondary overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <video
          ref={videoRef}
          className="h-full object-cover"
          src="/start-coding-club.mp4"
          autoPlay
          muted
          loop
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/55"></div>
      <div className="w-[90%] z-10 relative max-w-xl lg:mx-0 mx-auto">
        <h2 className="text-[2.1rem] uppercase text-center  mx-auto md:mx-0 md:text-left sm:text-5xl w-fit leading-[2rem] lg:text-[4.5rem] flex items-center justify-center mb-5 md:mb-8 font-light scale-y-[1.5] tracking-normal  lg:leading-[4rem] font-luckiest text-wrap md:text-nowrap">
          Start Coding,
          <br className="hidden md:block" /> Star Leading
        </h2>
        <p className="text-sm sm:px-10 md:px-0 sm:text-lg md:text-xl mb-5 font-light md:font-semibold mx-auto capitalize md:leading-7 text-center lg:text-left">
          Ready to kickstart your coding journey? 🌟 Join the Start Coding Club
          today and gain access to hands-on workshops, expert guidance, and a
          supportive community. Whether you're here to learn, create, or
          collaborate, this is your chance to grow your skills and turn your
          passion into success. Don’t wait, register now and start coding your
          future!
        </p>
        <CustomButton
          link={"participe"}
          text="Join Us"
          spanStyle="bg-therd"
          linkStyle="text-therd mx-auto md:mx-0 bg-secondary border-secondary hover:text-secondary hover:bg-secondary"
        />
      </div>
    </div>
  );
}

export default JoinUs;
