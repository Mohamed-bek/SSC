import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 border-[5px] border-t-primaryTransparent rounded-full animate-spin border-white mx-auto"></div>

        {/* Loading text */}
        <div className="mt-4 text-center text-white font-medium text-3xl">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loader;
