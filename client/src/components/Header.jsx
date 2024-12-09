import {FaFile, FaGreaterThan, FaLessThan} from "react-icons/fa"
import { HiMiniSlash } from "react-icons/hi2";
const Header = () => {
  return (
    <div className="text-center">
      {/* <h1 className="text-[3rem] font-bold text-primary flex items-center justify-center  mb-0">
        <FaLessThan/> <span className="text-[5rem]">Start Coding Club</span> <HiMiniSlash/> <FaGreaterThan/>
      </h1> */}

      <h2 className="text-[2rem] md:text-[3.5rem] text-purple-200  mx-auto mb-5 font-bold">
        <span className="text-primary"> SSC </span>  Where Innovation Meets Community
      </h2>
      <p className="text-[0.9rem] md:text-[1.2rem] leading-7 text-purple-200 max-w-3xl mx-auto capitalize">
      Empowering the next generation of innovators, our club is built by students, for students. We are a vibrant community driven by a passion for learning and collaboration, dedicated to helping you take your first steps into the world of coding. Together, we transform ideas into reality, one line of code at a time.
      </p>
    </div>
  );
};

export default Header;
