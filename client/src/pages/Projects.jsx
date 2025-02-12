import React, { useState, useEffect, useRef } from "react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import Project from "../components/Project";
import { SiMongodb, SiCloudinary, SiStripe } from "react-icons/si";

function Projects() {
  const projects = [
    {
      id: 0,
      title: "Britannia Sport and Exercise Science Academy",
      description:
        "A website highlighting the global presence of a UK-based team of sports scientists, coaches, and professionals. Built to showcase their expertise and impact across countries like Sweden, France, Morocco, and more.",
      images: ["/joinUs.png", "/univ.jpg", "/univ.jpg", "/univ.jpg"],
      video: "/images/bsesa1.mp4",
      link: "https://www.bsesac.co.uk/",
      techs: ["react", "nodejs", "stripe"],
      member: {
        _id: "1",
        firstName: "Mohamed",
        lastName: "Bekkouche",
        image: "/me.png",
      },
    },
    {
      member: {
        _id: "1",
        firstName: "Mohamed",
        lastName: "Bekkouche",
        image: "/me.png",
      },
      id: 1,
      title: "Foodly",
      description:
        "A restaurant platform designed for seamless food ordering and table booking. Showcasing a diverse menu of delicious meals, Foodly offers a user-friendly experience for both customers and administrators, complete with an admin panel for managing orders and reservations.",
      images: ["/univ.jpg", "/EP1.png", "/EP2.png", "/univ.jpg"],
      video: "/images/bsesa1.mp4",
      link: "https://food-lly.vercel.app/",
      techs: ["react", "nodejs", "nextjs"],
    },
    {
      member: {
        _id: "1",
        firstName: "Mohamed",
        lastName: "Bekkouche",
        image: "/me.png",
      },
      id: 2,
      title: "Your Health Towards Betterment",
      description:
        "A comprehensive platform dedicated to health, fitness, nutrition, and psychological well-being. Offering personalized fitness and nutrition plans, direct access to specialists, and educational campaigns, the platform focuses on providing expert services with a commitment to excellence, integrity, trust, and effectiveness.",
      images: ["/univ.jpg", "/univ.jpg", "/univ.jpg", "/univ.jpg"],
      video: "/images/bsesa1.mp4",
      link: "https://sport-client-gamma.vercel.app/",
      techs: ["react", "nodejs", "mongodb"],
    },
    {
      member: {
        _id: "1",
        firstName: "Mohamed",
        lastName: "Bekkouche",
        image: "/me.png",
      },
      id: 3,
      title: "masroofy",
      description:
        "Masroofy is a user-friendly web application designed to help you take control of your finances. Whether you're tracking daily expenses, monitoring income, or analyzing your spending patterns, Masroofy provides the tools you need to make informed financial decisions.",
      images: ["/univ.jpg", "/univ.jpg", "/univ.jpg", "/univ.jpg"],
      video: "/images/bsesa1.mp4",
      link: "https://masroofy-jade.vercel.app/",
      techs: ["react", "nodejs", "stripe"],
    },
  ];

  const projectRefs = useRef([]);

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
  }, []);

  return (
    <div className="w-full min-h-[calc(100dvh-82px)] bg-therd py-10">
      <h1 className="PageHeader py-5"> Our Arts </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] mx-auto items-stretch">
        {projects.map((project, index) => (
          <div
            key={project.id}
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
