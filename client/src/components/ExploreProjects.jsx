import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

function ExploreProjects() {
  const ExploreProjectsRef = useRef();
  const ImagesContainerRef = useRef();
  const ProjectImagesRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (ImagesContainerRef.current)
              ImagesContainerRef.current.classList.add("fade-in-up");
            if (ProjectImagesRef.current[0])
              ProjectImagesRef.current[0].classList.add(
                "-rotate-[10deg]",
                "-translate-x-[53%]",
                "scale-[1.15]"
              );
            if (ProjectImagesRef.current[1])
              ProjectImagesRef.current[1].classList.add(
                "scale-110",
                "-translate-x-[42%]",
                "-rotate-[8deg]"
              );
            if (ProjectImagesRef.current[2])
              ProjectImagesRef.current[2].classList.add("-rotate-[5deg]");
          }
        });
      },
      { threshold: 0.9 }
    );

    if (ExploreProjectsRef.current) {
      observer.observe(ExploreProjectsRef.current);
    }

    return () => {
      if (ExploreProjectsRef.current) {
        observer.unobserve(ExploreProjectsRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={ExploreProjectsRef}
      className="w-full min-h-dvh justify-center md:items-center flex bg-therd pb-20"
    >
      <div className="cont flex justify-center items-start md:items-center flex-wrap gap-20">
        <div
          style={{ animationDuration: "0.5s", animationDelay: "0s" }}
          ref={ImagesContainerRef}
          className="min-w-[200px] opacity-0 duration-500 md:min-w-[420px] relative"
        >
          <img
            ref={(e) => (ProjectImagesRef.current[0] = e)}
            className="w-[350px]  absolute top-1/2 left-1/2 -translate-x-[calc(50%-40px)] -translate-y-1/2 z-[1] duration-500 origin-bottom-left delay-500"
            loading="lazy"
            src="/EP3.png"
            alt="Explore 3"
          />
          <img
            ref={(e) => (ProjectImagesRef.current[1] = e)}
            className="w-[350px] absolute  top-1/2 left-1/2 -translate-x-[calc(50%-40px)] -translate-y-1/2 z-[2] duration-500 origin-bottom-left delay-500"
            loading="lazy"
            src="/EP2.png"
            alt="Explore 2"
          />
          <img
            ref={(e) => (ProjectImagesRef.current[2] = e)}
            className="w-[350px] absolute top-1/2 left-1/2 -translate-x-[calc(50%-40px)] md:-translate-x-[30%] -translate-y-1/2 z-[3] duration-500 origin-bottom-left delay-500"
            loading="lazy"
            src="/EP1.png"
            alt="Explore 1"
          />
        </div>
        <div className="-order-1 md:order-2 md:mb-0 w-full md:flex-1">
          <h2 className="PageHeader md:text-left">
            Explore Our
            <br /> Projects
          </h2>
          <p className="text-sm md:text-xl  font-semibold text-secondary mx-auto capitalize md:leading-7 mb-5 ">
            Explore the creative and technical brilliance of Start Coding Club
            members in our Portfolio section! From web applications and AI
            projects to innovative designs and entrepreneurial ventures, this
            space highlights the passion and skills of our community. Get
            inspired, collaborate, and witness the future of tech unfold!
          </p>
          <CustomButton
            link="/projects"
            spanStyle="bg-therd"
            linkStyle="text-therd mx-auto mb-10 md:mx-0 bg-secondary border-secondary hover:text-secondary hover:bg-therd"
            text="Explore"
          />
        </div>
      </div>
    </div>
  );
}

export default ExploreProjects;
