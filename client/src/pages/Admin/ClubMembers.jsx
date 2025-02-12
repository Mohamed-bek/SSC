import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import MemberCard from "../../components/MemberCard";
import InputFieldCustom from "../../components/InputFieldCustom";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const ClubMembers = () => {
  const API = useAxios();
  const [members, setMembers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [password, setPassword] = useState("");
  const deleteRef = useRef(null);
  const [id, setId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const getDepartements = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env?.REACT_APP_API_URL}department`
      );
      setDepartments(data.departments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDepartements();
  }, []);
  useEffect(() => {
    const getMembers = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + "member/all",
          {
            params: {
              firstName: searchQuery.split(" ")[0],
              lastName: searchQuery.split(" ")[1],
              department,
              page: currentPage,
              limit: 10,
            },
            withCredentials: true,
          }
        );
        setMembers(data.members);
        setNbOfPages(data.NbOfPages);
      } catch (error) {
        console.log(error);
      }
    };

    getMembers();
  }, [searchQuery, department, currentPage, NbOfPages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedUser && !event.target.closest(".user-card-overlay")) {
        setSelectedUser(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedUser]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      await API.delete(process.env.REACT_APP_API_URL + `admin/user/${id}`, {
        data: { password },
        withCredentials: true,
      });
      deleteRef.current.classList.add("scale-0");
      const NewUsers = members.filter((c) => c._id !== id);
      setMembers(NewUsers);
      setSelectedUser(null);
      setId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteB = (id) => {
    setId(id);
    deleteRef.current.classList.remove("scale-0");
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    setId(null);
    deleteRef.current.classList.add("scale-0");
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99]">
          <div className="user-card-overlay">
            <MemberCard member={selectedUser} />
          </div>
        </div>
      )}

      <div
        ref={deleteRef}
        className="absolute user-card-overlay duration-300 top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 z-[999] scale-0"
      >
        <form className="p-8 bg-therd rounded-lg">
          <InputFieldCustom
            value={password}
            setValue={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            styles="!w-[220px]"
            required
          />
          <div className="flex justify-center gap-2 items-center w-[220px] mt-5">
            <button
              onClick={deleteUser}
              className="bg-red-500 text-whiteColor flex-1 py-2 cursor-pointer font-semibold block rounded-md"
            >
              Delete
            </button>
            <button
              onClick={(e) => cancelDelete(e)}
              className="bg-blue-500 text-whiteColor flex-1 py-2 cursor-pointer font-semibold block rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* {Start Frommm Here } */}

      <div className="w-full bg-therd rounded-lg flex items-center justify-between px-5 py-2">
        <div className="flex items-center gap-2">
          <InputFieldCustom
            type="text"
            value={searchQuery}
            setValue={handleSearchChange}
            placeholder="Search by title..."
            name="searchQuery"
            styles="!w-[250px] !py-1.5"
          />
          <select
            className="w-full px-4 py-2 border border-white/10 bg-grayColor rounded-lg text-therd focus:outline-none"
            placeholder="Select Department"
            value={department}
            name="department"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value=""> Search By Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {" "}
                {department.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="add-member"
          className="flex bg-secondary items-center gap-2 text-lg font-semibold rounded-xl px-4 py-2 text-therd"
        >
          {" "}
          <FaPlus /> <span>Add Member </span>
        </Link>
      </div>

      <div className="flex-1 bg-therd rounded-lg overflow-hidden flex flex-col ">
        <header className="flex items-center text-secondary justify-between p-4 bg-therd border-b border-grayColor">
          <div className="flex-1 min-w-[300px]">Full Name</div>
          <div className="flex-1 min-w-[300px] text-start">Email</div>
          <div className="w-[200px] text-center">Department</div>
          <div className="w-[200px] text-center">Work</div>
          <div className="w-[130px] text-center">Joined Us</div>
          <div className="w-[60px] text-center">Manage</div>
        </header>

        <div className=" overflow-y-auto flex-1">
          {members.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between p-4 py-2 border-b font-normal text-[1.1rem] border-secondary hover:bg-black/30"
            >
              <div className="flex-1 min-w-[300px] flex items-center gap-2">
                <img
                  className="w-14 h-14 rounded-full cursor-pointer"
                  src={member?.image || "/default-avatar.jpg"}
                  onClick={() => setSelectedUser(member)}
                />
                {member?.firstName + " " + member?.lastName}
              </div>
              <div className="flex-1 min-w-[300px] text-start">
                {member?.email}
              </div>
              <div className="w-[200px] text-center">
                {member?.department?.name || "Without department"}
              </div>
              <div className="w-[200px] text-base text-center">
                {member?.work || "Null"}
              </div>
              <div className="w-[130px] text-center">
                {new Date(member?.createdAt).toLocaleDateString()}
              </div>
              <div className="w-[60px] text-center flex items-center justify-center gap-2">
                <button
                  title="delete"
                  onClick={() => deleteB(member?._id)}
                  className="text-red-500 ml-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-1 py-4">
          {[...Array(NbOfPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-[35px] text-[1.2rem] font-medium cursor-pointer py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-secondary text-therd"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubMembers;
