import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdEvent, MdLogout, MdOutlineDashboard } from "react-icons/md";
import { FaBuilding, FaUserGraduate, FaUsers } from "react-icons/fa";
import { useAdminContext } from "../../context/Admin";
import { FaFolderClosed } from "react-icons/fa6";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { admin, logout } = useAdminContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  }, [admin]);
  const logOut = async () => {
    logout();
    navigate("/");
  };
  const links = [
    {
      id: 0,
      name: "Dashboard",
      icon: <MdOutlineDashboard />,
      href: "",
    },
    {
      id: 1,
      name: "Members",
      icon: <FaUsers />,
      href: "/manage-members",
    },
    {
      id: 2,
      name: "Participants",
      icon: <FaUserGraduate />,
      href: "/partcipants",
    },
    {
      id: 3,
      name: "Departments",
      icon: <FaBuilding />,
      href: "/manage-departments",
    },
    {
      id: 4,
      name: "Events",
      icon: <MdEvent />,
      href: "/manage-events",
    },
    {
      id: 5,
      name: "Projects",
      icon: <FaFolderClosed />,
      href: "/manage-projects",
    },
  ];
  return (
    <div className={`w-full bg-therd h-dvh  py-1 pr-1 text-whiteColor p-0`}>
      <div className="h-full w-full flex items-center flex-wrap">
        <div className="w-[76px] bg-therd linksContainer overflow-hidden hover:w-[280px] duration-500 h-full flex justify-center items-center">
          <div className="w-full h-fit ">
            {links &&
              links.map((link) => (
                <NavLink
                  key={link.id}
                  className="dashLink flex justify-center items-center w-fit px-5 py-2.5 gap-5 z-10"
                  to={"/dashboard" + link.href}
                  end
                >
                  <span className="text-[2.2rem]">{link?.icon}</span>
                  <span className="text-xl text-nowrap font-medium">
                    {" "}
                    {link?.name}{" "}
                  </span>
                </NavLink>
              ))}
            <button
              onClick={() => logOut()}
              className="flex justify-center items-center w-fit px-5 py-2.5 gap-5"
            >
              {" "}
              <span className="text-[2.2rem]">
                {" "}
                <MdLogout />
              </span>
              <span className="text-xl text-nowrap"> Log Out </span>
            </button>
          </div>
        </div>
        <div className="flex-1 bg-secondary h-full overflow-hidden overflow-y-auto rounded-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
