import React from "react";
import { Link } from "react-router-dom";

function CustomButton({ text, linkStyle, spanStyle, link = null }) {
  return (
    <Link
      to={link || null}
      className={`group relative w-fit block font-semibold text-xl py-2 font-inter px-6 border-[2px] ${linkStyle} cursor-pointer rounded-full overflow-hidden  duration-300`}
    >
      <span className="relative z-10">{text}</span>
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0 h-0 rounded-full ${spanStyle} group-hover:w-[250px] group-hover:h-[200px] duration-500`}
      >
        {" "}
      </span>
    </Link>
  );
}

export default CustomButton;
