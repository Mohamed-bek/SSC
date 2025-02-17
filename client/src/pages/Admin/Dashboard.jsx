import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdEvent, MdLogout, MdOutlineDashboard } from "react-icons/md";
import { FaBuilding, FaUserGraduate, FaUsers } from "react-icons/fa";
import { useAdminContext } from "../../context/Admin";
import { FaFolderClosed } from "react-icons/fa6";
import { useEffect } from "react";
import DeletePopup from "../../components/DeletePopup";
import { IoStatsChartSharp } from "react-icons/io5";

const Dashboard = () => {
  const { admin, logout } = useAdminContext();
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
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
      name: "Analytics",
      icon: <IoStatsChartSharp />,
      href: "/analytics",
    },
    {
      id: 2,
      name: "Members",
      icon: <FaUsers />,
      href: "/manage-members",
    },
    {
      id: 3,
      name: "Participants",
      icon: <FaUserGraduate />,
      href: "/partcipants",
    },
    {
      id: 4,
      name: "Departments",
      icon: <FaBuilding />,
      href: "/manage-departments",
    },
    {
      id: 5,
      name: "Events",
      icon: <MdEvent />,
      href: "/manage-events",
    },
    {
      id: 6,
      name: "Projects",
      icon: <FaFolderClosed />,
      href: "/manage-projects",
    },
  ];
  return (
    <div className={`w-full bg-therd h-dvh  py-1 pr-1 text-whiteColor p-0`}>
      {popup && (
        <DeletePopup
          text="Log Out"
          subText="Click On Confirm To Log Out"
          deleteFunc={logOut}
          cancel={() => setPopup(false)}
          underText="Confirm"
        />
      )}
      <div className="h-full w-full flex items-center flex-wrap">
        <div className="w-[76px] bg-therd linksContainer overflow-hidden hover:w-[250px] duration-500 h-full flex justify-center items-center">
          <div className="w-full h-fit ">
            {links &&
              links.map((link) => (
                <NavLink
                  key={link.id}
                  className="dashLink flex justify-center items-center w-fit px-5 py-2.5 gap-5 z-10 mb-3"
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
              onClick={() => setPopup(true)}
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
