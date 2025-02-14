import React, { useEffect, useState, useRef } from "react";
import InputFieldCustom from "./InputFieldCustom";
import useAxios from "../hooks/useAxios";

function SelectMember({ selectedMember, setSelectedMember }) {
  const API = useAxios();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const GetMembers = async () => {
      try {
        const { data } = await API.get(
          `${process.env.REACT_APP_API_URL}member/all`
        );
        setMembers(data.members);
      } catch (error) {
        console.log(error);
      }
    };
    GetMembers();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredMembers(
        members.filter((member) =>
          `${member.firstName} ${member.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [search, members]);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (member) => {
    setSearch(`${member.firstName} ${member.lastName}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <InputFieldCustom
        type="text"
        value={search}
        setValue={(e) => setSearch(e.target.value)}
        placeholder="Select a member"
      />
      {/* <input className="border p-2 rounded w-full" /> */}
      {showDropdown && (
        <ul className="absolute z-10 w-full bg-grayColor text-therd border rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <li
                key={member._id}
                onClick={() => handleSelect(member)}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={member.image}
                  alt="member"
                  className="w-8 h-8 rounded-full"
                />
                <span>{`${member.firstName} ${member.lastName}`}</span>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SelectMember;
