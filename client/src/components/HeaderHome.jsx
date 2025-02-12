import React from "react";
import { Link, NavLink } from "react-router-dom";
import CustomButton from "./CustomButton";

function HeaderHome() {
  const links = [
    {
      id: 0,
      to: "/events",
      name: "Events",
    },
    {
      id: 1,
      to: "/members",
      name: "Memebers",
    },
    {
      id: 2,
      to: "/departements",
      name: "Departements",
    },
    {
      id: 3,
      to: "/projects",
      name: "Projects",
    },
  ];
  return (
    <div className="bg-therd py-4 w-full flex justify-between items-center px-1 md:px-10 text-white MainHeaderAnimation -translate-y-full z-50">
      <Link to="/" className="logo text-[3rem]">
        <img loading="lazy" src="/logo.png" className="w-10 md:w-14" />
      </Link>
      <nav className="w-fit">
        {links.map((link) => (
          <NavLink
            className="link px-3 py-3 text-[1rem] md:text-[1.2rem] font-semibold cursor-pointer duration-300 hover:text-primary"
            to={link.to}
            key={link.id}
          >
            {" "}
            {link.name}{" "}
          </NavLink>
        ))}
      </nav>
      <div className="flex justify-center items-center gap-5">
        <CustomButton
          link="/join-us"
          text="Join Us"
          spanStyle="bg-therd"
          linkStyle="text-therd bg-secondary border-secondary hover:text-secondary hover:bg-therd"
        />
      </div>
    </div>
  );
}

export default HeaderHome;
