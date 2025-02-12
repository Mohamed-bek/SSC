import React from "react";
import { FaLink } from "react-icons/fa";
import TechStack from "./TechsIcons";

function Project({ project }) {
  return (
    <div
      key={project.id}
      className="group h-full bg-secondary rounded-md overflow-hidden relative p-2"
    >
      <div className="rounded-xl">
        <div className="relative h-96 border border-therd overflow-hidden rounded-xl group hover:shadow-2xl transition-all duration-500 mb-3">
          <img
            loading="lazy"
            src={project?.images[0]}
            alt="Gallery image 1"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {project?.images.slice(1).map((src, index) => (
            <div
              key={index}
              className="relative border border-therd aspect-square overflow-hidden rounded-xl group hover:shadow-2xl transition-all duration-500"
            >
              <img
                loading="lazy"
                src={src}
                alt={`Gallery image ${index + 2}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div> */}
      </div>
      <div className="h-fit p-3 text-therd ">
        <div className="w-full mb-2 mx-auto h-[1px] bg-therd"> </div>
        <div className="flex items-center gap-3 cursor-pointer w-fit">
          <div className="border-2 border-therd rounded-full">
            <img
              loading="lazy"
              className="w-14 h-14 object-cover rounded-full border-1 border-therd bg-white"
              src={project?.member?.image}
              alt={project?.member?.firstName}
            />
          </div>
          <p className="text-therd font-semibold text-xl">
            {" "}
            {`${project?.member?.firstName} ${project?.member?.lastName}`}{" "}
          </p>
        </div>
        <div className="w-full my-2 mx-auto h-[1px] bg-therd"> </div>
        <a
          className="text-[1.5em] mb-3 text-nowrap text-left font-semibold  w-full flex items-center gap-3 hover:text-gray-700 duration-200"
          href={project.link}
          target="_blank"
        >
          {project.title}
          <FaLink />
        </a>
        <div className="flex gap-4 items-center justify-center lg:justify-start mb-3">
          {" "}
          <TechStack technologies={project.techs} />
        </div>

        <div className="w-full mb-2 mx-auto h-[1px] bg-therd"> </div>
        <p className="text-[1.15rem] text-tertiary font-medium line-clamp-5">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default Project;
