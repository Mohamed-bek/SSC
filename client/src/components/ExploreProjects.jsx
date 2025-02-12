import React, { useEffect, useRef } from "react";
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
                "scale-[1.15]"
              );
            if (ProjectImagesRef.current[1])
              ProjectImagesRef.current[1].classList.add(
                "scale-110",
                "-translate-x-[calc(50%-25px)]",
                "-rotate-[7deg]"
              );
            if (ProjectImagesRef.current[2])
              ProjectImagesRef.current[2].classList.add(
                "-rotate-[5deg]",
                "-translate-x-[calc(50%-60px)]"
              );
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
      className="w-full h-dvh justify-center items-center flex bg-therd"
    >
      <div className="cont flex justify-center items-center flex-wrap gap-20">
        <div
          style={{ animationDuration: "0.5s", animationDelay: "0s" }}
          ref={ImagesContainerRef}
          className="min-w-[350px] opacity-0 duration-500 md:min-w-[420px] relative"
        >
          <img
            ref={(e) => (ProjectImagesRef.current[0] = e)}
            className="w-[350px]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] duration-500 origin-bottom-left delay-500"
            loading="lazy"
            src="/EP3.png"
            alt="Explore 3"
          />
          <img
            ref={(e) => (ProjectImagesRef.current[1] = e)}
            className="w-[350px] absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] duration-500 origin-bottom-left delay-500"
            loading="lazy"
            src="/EP2.png"
            alt="Explore 2"
          />
          <img
            ref={(e) => (ProjectImagesRef.current[2] = e)}
            className="w-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] duration-500 origin-bottom-left delay-500"
            loading="lazy"
            src="/EP1.png"
            alt="Explore 1"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-[3rem] leading-[2.5rem] md:text-[4.5rem] flex items-center justify-center mb-8 font-light scale-y-[1.5] tracking-wider  md:leading-[4rem] font-luckiest text-secondary w-fit">
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
            spanStyle="bg-therd"
            linkStyle="text-therd bg-secondary border-secondary hover:text-secondary hover:bg-therd"
            text="Explore"
          />
        </div>
      </div>
    </div>
  );
}

export default ExploreProjects;
