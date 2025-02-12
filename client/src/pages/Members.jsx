import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUsers, FaSearch, FaStar } from "react-icons/fa";
import MemberCard from "../components/MemberCard";
import Stars from "../components/Stars";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const mockMembers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      image: "/api/placeholder/200/200",
      department: "Web Development",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      image: "/api/placeholder/200/200",
      department: "Data Science",
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      image: "/api/placeholder/200/200",
      department: "Mobile Development",
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Brown",
      image: "/api/placeholder/200/200",
      department: "UI/UX Design",
    },
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      image: "/api/placeholder/200/200",
      department: "Web Development",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      image: "/api/placeholder/200/200",
      department: "Data Science",
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      image: "/api/placeholder/200/200",
      department: "Mobile Development",
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Brown",
      image: "/api/placeholder/200/200",
      department: "UI/UX Design",
    },
  ];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL + "member/all",
          {
            params: {
              page: 1,
              limit: 12,
              firstName: searchTerm.split(" ")[0],
              lastName: searchTerm.split(" ")[1],
            },
          }
        );
        setMembers(data.members);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch members", error);
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-dvh bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="animate-pulse text-white text-2xl flex items-center">
          <FaUsers className="mr-4 h-12 w-12" />
          Loading Members...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-82px)] px-4 sm:px-6 bg-therd pt-10">
      {/* <Stars/> */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="PageHeader">Our Amazing Team</h1>
          <p className="text-xl text-secondary">
            Meet the talented individuals driving innovation
          </p>
        </div>
        {/* Members Grid */}
        {members.length === 0 ? (
          <div className="text-center text-white/70 text-xl py-12">
            No members found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-10">
            {members.map((member) => (
              <MemberCard member={member} key={member._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
