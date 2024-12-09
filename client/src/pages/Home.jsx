import React from "react";
import Stars from "../components/Stars";
import Header from "../components/Header";

function Home() {
  return (
    // <div className="w-full min-h-[100dvh] flex justify-center items-center relative z-20">
    //   <div className="w-[600px] h-[600px] z-0 rounded-full blurCss"></div>
    //   <div className=" absolute z-50 top-0 left-0 w-full h-full homeb"></div>
    // </div>
    <div className="w-full h-full">
      <div className="w-full h-dvh bg-gradient-to-b from-black via-black/90 via-[70%] to-purple-900/40 to-[100%]">
        <Stars />
        <div className="relative z-10 min-h-dvh flex items-center justify-center px-4 ">
          <Header />
        </div>
      </div>
    </div>
  );
}

export default Home;
