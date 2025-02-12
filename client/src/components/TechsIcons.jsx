import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaJava,
  FaPhp,
  FaAngular,
  FaVuejs,
  FaDocker,
  FaGithub,
  FaNpm,
  FaDatabase,
  FaAws,
  FaCode,
} from "react-icons/fa";
import { BsStripe } from "react-icons/bs";
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiDjango,
  SiSpring,
} from "react-icons/si";

export const techIcons = {
  react: FaReact,
  angular: FaAngular,
  vue: FaVuejs,
  nextjs: SiNextdotjs,
  html: FaHtml5,
  css: FaCss3Alt,
  tailwind: SiTailwindcss,

  // Languages
  javascript: SiJavascript,
  typescript: SiTypescript,
  python: FaPython,
  java: FaJava,
  php: FaPhp,

  // Backend & Databases
  nodejs: FaNodeJs,
  express: SiExpress,
  django: SiDjango,
  spring: SiSpring,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  firebase: SiFirebase,

  // Tools & Platforms
  docker: FaDocker,
  github: FaGithub,
  npm: FaNpm,
  aws: FaAws,
  database: FaDatabase,
  stripe: BsStripe,
};
const TechStack = ({ technologies }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {technologies.map((tech, index) => {
        const techKey = tech.toLowerCase();
        const IconComponent = techIcons[techKey];

        if (IconComponent) {
          return (
            <div
              key={index}
              className="bg-therd text-white font-bold text-[1.05rem] hover:bg-[#22152bd1]  flex items-center gap-2 px-4 cursor-pointer duration-200 py-[6px] rounded-md fade-in-down opacity-0 capitalize"
              title={tech}
            >
              <span className=" text-secondary text-[1.3rem]">
                <IconComponent />
              </span>
              {/* <IconComponent className="text-xl" /> */}
              <span className="hidden lg:block">{tech}</span>
            </div>
          );
        }

        // If no icon is found, just display the text
        return (
          <div
            key={index}
            className="bg-therd  text-white font-bold text-[1.05rem] hover:bg-[#22152bd1]  flex items-center gap-2 px-4 cursor-pointer duration-200 py-[6px] rounded-md fade-in-down opacity-0 capitalize"
          >
            <span className="text-secondary text-[1.3rem]">
              <FaCode />
            </span>
            {tech}
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
