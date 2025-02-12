import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Fotter() {
  return (
    <div className="w-full pt-10 pb-5 bg-secondary">
      <div className="w-fit flex justify-center items-center gap-5 mx-auto mb-8">
        <img
          loading="lazy"
          alt="SCC Logo"
          src="/logo.png"
          className="w-40 h-40"
        />
        <div className="w-2 rounded-lg bg-therd h-40"></div>
        <h3 className="text-4xl text-therd font-luckiest scale-y-150 pt-2.5 leading-9">
          Start
          <br />
          Coding
          <br />
          Club
        </h3>
      </div>
      <div className="w-fit mx-auto flex justify-center items-center gap-5 text-2xl text-secondary">
        <Link
          target="_blank"
          to="https://www.facebook.com/profile.php?id=100069004863199"
          className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-therd text-4xl  hover:text-[2.7rem] duration-300"
        >
          <FaFacebook />
        </Link>
        <Link
          target="_blank"
          to="https://www.instagram.com/startcodingclub/"
          className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-therd text-4xl hover:text-[2.7rem] duration-300"
        >
          <FaInstagram />
        </Link>
        <Link
          target="_blank"
          to="https://www.linkedin.com/company/start-coding-club/"
          className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-therd text-[2.1rem] hover:text-[2.5rem] duration-300"
        >
          <FaLinkedin />
        </Link>
        <Link
          target="_blank"
          to="mailto:startcodingclub2024@gmail.com"
          className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-therd text-[2.1rem] hover:text-[2.5rem] duration-300"
        >
          <FaEnvelope />
        </Link>
      </div>
      <fieldset className="border-t border-therd w-2/4 mx-auto my-3 text-center mt-6 ">
        <legend className="text-therd text-lg font-medium font-inter text-center ">
          {" "}
          © 2025 Start Coding Club. All rights reserved
        </legend>
      </fieldset>
    </div>
  );
}

export default Fotter;
