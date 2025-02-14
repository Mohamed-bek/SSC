import React, { useEffect, useRef, useState } from "react";
import Project from "../components/Project";
import Loader from "../components/Loader";
import InputFieldCustom from "../components/InputFieldCustom";
import axios from "axios";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const projectRefs = useRef([]);

  const GetProjects = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}project`,
        {
          params: {
            page: 1,
            limit: 12,
            title: searchTerm,
          },
        }
      );
      console.log(data);
      setProjects(data.projects || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetProjects();
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [projects]);

  return (
    <div className="w-full min-h-[calc(100dvh-82px)] bg-therd py-10">
      {isLoading && <Loader />}
      <div className="text-center mb-0 items-center flex justify-between w-[90%] mx-auto">
        <div>
          <h1 className="PageHeader !text-5xl">Our Art</h1>
        </div>
        <div className="mb-6">
          <InputFieldCustom
            placeholder="Search By Title..."
            type="search"
            styles={"!max-w-[400px]"}
            value={searchTerm}
            setValue={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] mx-auto items-stretch">
        {projects.length > 0 &&
          projects.map((project, index) => (
            <div
              key={project?._id}
              ref={(el) => (projectRefs.current[index] = el)}
              style={{ animationDelay: `${index % 2 === 0 ? "0" : "50"}ms` }}
              className="opacity-0 transform translate-y-[50px] transition-all duration-700 ease-out"
            >
              <Project project={project} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Projects;
