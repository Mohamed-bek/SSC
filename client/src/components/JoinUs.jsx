import React from "react";
import CustomButton from "./CustomButton";

function JoinUs() {
  return (
    <div className="min-h-dvh  w-full bg-therd  justify-center items-center flex pb-10 pt-20 text-secondary">
      <div className="cont justify-center items-center flex flex-wrap gap-10">
        <div className="w-full md:w-1/2 ">
          <h2 className="text-[2.1rem] text-center  mx-auto md:mx-0 md:text-left sm:text-5xl w-fit leading-[2rem] lg:text-[4.5rem] flex items-center justify-center mb-5 md:mb-8 font-light scale-y-[1.5] tracking-wider  lg:leading-[4rem] font-luckiest text-wrap md:text-nowrap">
            Start Coding,
            <br className="hidden md:block" /> Star Leading
          </h2>
          <p className="text-sm sm:px-10 md:px-0 sm:text-lg md:text-xl mb-5 font-light md:font-semibold mx-auto capitalize md:leading-7">
            Ready to kickstart your coding journey? 🌟 Join the Start Coding
            Club today and gain access to hands-on workshops, expert guidance,
            and a supportive community. Whether you're here to learn, create, or
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
        <div className="w-[90%] md:flex-1">
          <img
            className="w-full object-contain"
            src="/joinUs.png"
            alt="Join Us"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
