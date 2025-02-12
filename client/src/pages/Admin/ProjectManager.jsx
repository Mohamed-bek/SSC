import React, { useState } from "react";
import { useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

function ProjectManager() {
  const API = useAxios();
  const [projects, setProjects] = useState([]);
  const getProjetcs = async () => {
    try {
      const { data } = await API.get(
        `${process.env?.REACT_APP_API_URL}project`
      );
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjetcs();
  }, []);
  return (
    <div className="w-full h-full rounded-lg flex flex-col gap-3">
      <div className="flex justify-between items-center px-4 py-3 rounded-lg  bg-therd">
        <h1 className="text-2xl text-secondary font-medium"> Projects </h1>
        <Link
          to="add-event"
          className="flex bg-secondary items-center gap-2 text-lg font-semibold rounded-xl px-4 py-2 text-therd"
        >
          {" "}
          <FaPlus /> <span>Add Project </span>
        </Link>
      </div>
      <div className="flex-1 bg-therd rounded-lg overflow-hidden">
        <header className="flex items-center text-secondary justify-between p-4 bg-therd border-b border-grayColor">
          <div className="w-[300px]">Title</div>
          <div className="w-[200px] text-center">Team</div>
          <div className="w-[300px] text-center">Link</div>
          <div className="w-[200px] text-center pl-5">Date</div>
          <div className="w-[120px] text-center">Manage</div>
        </header>
        <div className=" overflow-y-auto flex-1">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center justify-between p-4 py-2 border-b font-normal text-[1.1rem] border-secondary hover:bg-black/30"
            >
              <div className="w-[300px] flex items-center gap-2">
                <img
                  className="w-14 h-14 rounded-full cursor-pointer"
                  src={project?.image?.secure_url || "/default-avatar.jpg"}
                  // onClick={() => setSelectedUser(member)}
                />
                {project?.title}
              </div>
              <div className="w-[200px] flex items-center justify-center gap-2 -space-x-1">
                {" "}
                {project.members.map((member, index) => (
                  <div
                    key={member._id}
                    className="w-12 h-12 rounded-full border-1 border-secondary overflow-hidden"
                  >
                    <img
                      src={member?.image || "/speaker-placeholder.png"}
                      alt={`${member?.firstName} ${member?.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}{" "}
              </div>
              <div className="w-[300px] text-center">
                <Link
                  to={project.link}
                  className="w-fit text-center hover:text-blue-400"
                >
                  Go Check
                </Link>
              </div>
              <div className="w-[200px] text-center">
                {new Date(project.createdAt).toLocaleDateString("Gb")}
              </div>
              <div className="w-[120px] text-center flex items-center justify-center gap-2">
                <button
                  title="delete"
                  // onClick={() => deleteB(departement?._id)}
                  className="text-red-500 ml-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectManager;
