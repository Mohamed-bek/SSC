import React from "react";
import CustomButton from "./CustomButton";

function JoinUs() {
  return (
    <div className="min-h-dvh  w-full bg-therd  justify-center items-center flex pt-[70px] text-secondary">
      <div className="cont justify-center items-center flex  flex-wrap gap-10">
        <div className="flex-1 ">
          <h2 className="text-[3rem] -ml-10 leading-[2.5rem] md:text-[4.5rem] flex items-center justify-center mx-auto mb-8 font-light scale-y-[1.5] tracking-wider  md:leading-[4rem] font-luckiest">
            Start Coding,
            <br /> Star Leading
          </h2>
          <p className="text-sm md:text-xl mb-5 font-semibold mx-auto capitalize md:leading-7">
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
            linkStyle="text-therd bg-secondary border-secondary hover:text-secondary hover:bg-secondary"
          />
        </div>
        <div className="flex-1 ">
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
