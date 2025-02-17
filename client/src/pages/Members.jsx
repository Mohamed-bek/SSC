import axios from "axios";
import React, { useState, useEffect } from "react";
import MemberCard from "../components/MemberCard";
import Loader from "../components/Loader";
import InputFieldCustom from "../components/InputFieldCustom";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-[calc(100dvh-82px)] px-4 sm:px-6 bg-therd pt-3 md:pt-10">
      {isLoading && <Loader />}
      <div className="w-full md:w-[90%] mx-auto">
        <div className="text-center items-center flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h1 className="PageHeader !text-3xl md:!text-5xl">
              Our Amazing Team
            </h1>
          </div>
          <div className="-mt-4 md:mt-0 md:mb-6">
            <InputFieldCustom
              placeholder="Search By Name..."
              type="search"
              styles={"!max-w-[300px]"}
              value={searchTerm}
              setValue={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {members.length === 0 ? (
          <div className="text-center text-white/70 text-xl py-12">
            No members found
          </div>
        ) : (
          <div className="flex justify-center flex-wrap md:justify-start items-stretch gap-5">
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
