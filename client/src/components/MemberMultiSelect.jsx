import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";

const MemberMultiSelect = ({
  selectedMembers = [],
  setSelectedMembers,
  maxSelection = Infinity,
}) => {
  const AllMemberRef = useRef();
  const [members, setMembers] = useState([]);

  const GetMembers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}member/all`
      );
      setMembers(data.members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetMembers();
  }, []);

  const handleMemberClick = (member) => {
    const memberId = member._id;
    if (selectedMembers.includes(memberId)) {
      const values = selectedMembers.filter((id) => id !== memberId);
      setSelectedMembers(values);
    } else {
      if (maxSelection === 1) {
        setSelectedMembers([memberId]);
      } else if (selectedMembers.length < maxSelection) {
        setSelectedMembers((prev) => [...prev, memberId]);
      }
    }
    if (maxSelection === 1) {
      AllMemberRef.current.classList.add("scale-0");
    }
  };

  const handleRemoveMember = (e, memberId) => {
    e.preventDefault();
    const values = selectedMembers.filter((id) => id !== memberId);
    setSelectedMembers(values);
  };

  const selectedMemberObjects = members.filter((member) =>
    selectedMembers.includes(member._id)
  );

  return (
    <div className="w-full">
      <div className="mb-0">
        <div className="flex flex-wrap gap-2 p-2 bg-grayColor/20 rounded-lg">
          {selectedMemberObjects.map((member) => (
            <div
              key={member._id}
              className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                    {member.firstName[0]}
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-therd">
                {member.firstName} {member.lastName}
              </span>
              <button
                onClick={(e) => handleRemoveMember(e, member._id)}
                className="p-1 hover:bg-red-100 rounded-full transition-colors"
              >
                <FaTimes className="text-red-500 text-lg" />
              </button>
            </div>
          ))}
          {(!maxSelection || selectedMembers.length < maxSelection) && (
            <button
              onClick={(e) => {
                e.preventDefault();
                AllMemberRef.current.classList.remove("scale-0");
              }}
              className="text-center text-lg bg-secondary text-therd px-3 py-2.5 rounded-lg flex gap-2 items-center"
            >
              <FaPlus className="text-sm" />
              {selectedMemberObjects.length > 0
                ? "Change Selection"
                : maxSelection === 1
                ? "Select Member"
                : "Select Members"}
            </button>
          )}
        </div>
      </div>

      <div
        ref={AllMemberRef}
        className="w-full duration-150 scale-0 h-full bg-black/50 z-10 flex justify-center items-center rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10"
      >
        <div className="bg-therd rounded-lg p-10">
          <h3 className="text-center text-xl font-semibold mb-2">
            Select {maxSelection === 1 ? "Member" : "Members"}
          </h3>
          <p className="text-sm font-light text-center mb-5">
            {maxSelection === 1
              ? "Click on a member to select them"
              : "Click on members to select or unselect"}
          </p>

          <div className="px-2 py-1 flex justify-center items-center flex-wrap gap-2 max-h-[220px] overflow-y-auto">
            {members?.map((member) => (
              <div
                key={member._id}
                onClick={() => handleMemberClick(member)}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMembers.includes(member._id)
                    ? "bg-green-500 text-white"
                    : "bg-grayColor text-therd"
                }`}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                      {member.firstName[0]}
                    </div>
                  )}
                </div>
                <span className="text-[1.1rem] font-medium">
                  {member.firstName} {member.lastName}
                </span>
                {selectedMembers.includes(member._id) && (
                  <FaCheck className="text-sm" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-5 w-fit mx-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                AllMemberRef.current.classList.add("scale-0");
              }}
              className="w-[180px] text-center block mx-auto py-2 text-lg rounded-lg bg-[#53abea] hover:bg-[#3f8dc5] duration-100 text-white font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberMultiSelect;
