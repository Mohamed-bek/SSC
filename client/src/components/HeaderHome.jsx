// import React, { useRef, useEffect } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import CustomButton from "./CustomButton";
// import { IoMenu } from "react-icons/io5";

// function HeaderHome() {
//   const links = [
//     { id: 0, to: "", name: "Home" },
//     { id: 1, to: "/events", name: "Events" },
//     { id: 2, to: "/projects", name: "Projects" },
//     { id: 3, to: "/members", name: "Members" },
//     { id: 4, to: "/departements", name: "Departments" },
//   ];

//   const LinkRef = useRef(null);
//   const LinksRef = useRef([]);
//   const location = useLocation();

//   // Reset classes when route changes
//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       // Only for mobile
//       LinkRef.current.classList.remove("fade-in-up");
//       LinksRef.current.forEach((el) => {
//         if (el) el.classList.remove("slideIn");
//       });
//     }
//   }, [location]);

//   const HandleMenu = () => {
//     LinkRef.current.classList.toggle("fade-in-up");
//     LinksRef.current.forEach((el) => {
//       if (el) el.classList.toggle("slideIn");
//     });
//   };

//   return (
//     <div className="bg-therd py-4 w-full flex justify-between items-center px-1 md:px-10 text-white MainHeaderAnimation -translate-y-full z-50 relative">
//       <Link to="/" className="logo text-[3rem]">
//         <img
//           loading="lazy"
//           src="/logo.png"
//           className="w-10 md:w-14"
//           alt="Logo"
//         />
//       </Link>
//       <nav
//         ref={LinkRef}
//         className="absolute h-[calc(100dvh-67px)] pb-3 md:pb-0 md:pl-0 md:h-fit left-0 w-full opacity-0 md:opacity-100 translate-y-10 md:translate-y-0 top-full bg-black/60 md:bg-therd backdrop-blur-md z-50 md:relative flex flex-col md:flex-row md:w-fit"
//         style={{ animationDuration: "0.2s" }}
//       >
//         {links.map((link, i) => (
//           <NavLink
//             ref={(el) => (LinksRef.current[i] = el)}
//             className={`link flex items-center flex-1 md:flex-[0] px-3 py-3 text-4xl font- tracking-wider w-full md:w-fit md:text-[1.2rem] md:font-semibold cursor-pointer duration-300 hover:text-primary`}
//             to={link.to}
//             key={link.id}
//           >
//             <span
//               className={`w-full block text-center ${
//                 i % 2 === 0 ? "translate-x-[140%]" : "-translate-x-[110%]"
//               } md:translate-x-0 duration-300 delay-100`}
//             >
//               {link.name}
//             </span>
//           </NavLink>
//         ))}
//       </nav>
//       <div className="hidden md:flex justify-center items-center gap-5">
//         <CustomButton
//           link="/join-us"
//           text="Join Us"
//           spanStyle="bg-therd"
//           linkStyle="text-therd bg-secondary border-secondary hover:text-secondary hover:bg-therd"
//         />
//       </div>
//       <IoMenu onClick={HandleMenu} className="text-3xl md:hidden" />
//     </div>
//   );
// }

// export default HeaderHome;

import React, { useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CustomButton from "./CustomButton";
import { IoMenu } from "react-icons/io5";

function HeaderHome() {
  const links = [
    { id: 0, to: "", name: "Home" },
    { id: 1, to: "/events", name: "Events" },
    { id: 2, to: "/projects", name: "Projects" },
    { id: 3, to: "/members", name: "Members" },
    { id: 4, to: "/departements", name: "Departments" },
  ];

  const LinkRef = useRef(null);
  const LinksRef = useRef([]);

  const HandleMenu = () => {
    LinkRef.current.classList.toggle("hidden");
    setTimeout(() => {
      LinkRef.current.classList.toggle("flex");
      LinkRef.current.classList.toggle("fade-in-up");
      LinksRef.current.forEach((el) => {
        if (el) el.classList.toggle("slideIn");
      });
    }, 30);
  };

  const handleLinkClick = (i) => {
    if (LinksRef.current[i])
      LinksRef.current.forEach((el) => {
        if (el) {
          setTimeout(() => {
            el.classList.remove("slideIn");
            setTimeout(() => {
              LinkRef.current.classList.remove("flex", "fade-in-up");
              LinkRef.current.classList.add("hidden");
            }, 400);
          }, 200);
        }
      });
  };

  return (
    <div className="bg-therd py-3 md:py-4  w-full flex justify-between items-center px-5 md:px-10 text-secondary MainHeaderAnimation -translate-y-full z-50 relative">
      <Link to="/" className="logo text-[3rem]">
        <img
          loading="lazy"
          src="/logo.png"
          className="w-10 md:w-14"
          alt="Logo"
        />
      </Link>
      <nav
        ref={LinkRef}
        className=" absolute  h-[calc(100dvh-67px)] pb-3 md:pb-0 md:pl-0 md:h-fit top-[67px] md:top-0 left-0 w-full hidden md:flex opacity-0 md:opacity-100 translate-y-10 md:translate-y-0  bg-black/60 md:bg-therd backdrop-blur-md z-50 md:relative  flex-col md:flex-row md:w-fit"
        style={{ animationDuration: "0.2s" }}
      >
        {links.map((link, i) => (
          <NavLink
            className={`link flex items-center flex-1 md:flex-[0] px-3 py-3 text-4xl font-bold tracking-wide w-full md:w-fit md:text-lg md:font-semibold cursor-pointer duration-100 hover:text-primary`}
            to={link.to}
            key={link.id}
            onClick={handleLinkClick(i)}
          >
            <span
              ref={(el) => (LinksRef.current[i] = el)}
              className={`w-full block text-center ${
                i % 2 === 0 ? "translate-x-[140%]" : "-translate-x-[110%]"
              } md:translate-x-0 duration-300 delay-100`}
            >
              {link.name}
            </span>
          </NavLink>
        ))}
      </nav>
      <div className=" md:flex justify-center items-center gap-5">
        <CustomButton
          link="/join-us"
          text="Join Us"
          spanStyle="bg-therd"
          linkStyle="text-therd bg-secondary border-secondary hover:text-secondary hover:bg-therd"
        />
      </div>
      <IoMenu onClick={HandleMenu} className="text-4xl md:hidden" />
    </div>
  );
}

export default HeaderHome;
