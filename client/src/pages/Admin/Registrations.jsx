import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  FaUser,
  FaEnvelope,
  FaCalendar,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import InputFieldCustom from "../../components/InputFieldCustom";

const RegistrationList = () => {
  const API = useAxios();
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const GetRegistrations = async () => {
    try {
      const { data } = await API.get(
        `${process.env.REACT_APP_API_URL}registration/${id}`,
        {
          params: {
            firstName: searchTerm.split(" ")[0],
            lastName: searchTerm.split(" ")[1],
          },
        }
      );
      setRegistrations(data.registrations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetRegistrations();
  }, [searchTerm]);

  return (
    <div className="w-full h-full rounded-lg text-secondary flex flex-col gap-3">
      {/* Header Section */}
      <div className="p-3 rounded-lg bg-therd flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaUser className="h-6 w-6" />
          {registrations.length} Registrations To{" "}
          {registrations[0]?.event?.title}
        </h2>
        <div className="relative">
          <FaSearch className="h-5 w-5 absolute left-2 text-therd top-1/2 transform -translate-y-1/2" />
          <InputFieldCustom
            type="search"
            placeholder="Search registrations..."
            value={searchTerm}
            styles="!pl-9"
            setValue={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 bg-therd rounded-lg flex flex-col overflow-hidden">
        <header className="flex items-center text-secondary justify-between p-4 bg-therd border-b border-grayColor">
          <div className="min-w-[350px] flex-1">NAME</div>
          <div className="w-[400px] text-start pl-5">EMAIL</div>
          <div className="w-[300px] text-start">EVENT</div>
          <div className="w-[120px] text-center">REGISTERED</div>
        </header>
        <div className="overflow-y-scroll flex-1">
          {registrations.map((registration) => (
            <div
              key={registration._id}
              className="flex items-center justify-between p-4 py-2 border-b font-normal text-[1.1rem] border-secondary hover:bg-black/30"
            >
              <div className="min-w-[350px] flex-1 flex items-center ">
                {" "}
                <div className="h-12 w-12 border border-secondary rounded-full bg-primaryTransparent flex items-center justify-center mr-3">
                  <span className="text-[white] font-medium text-lg">
                    {registration.firstName[0]}
                    {registration.lastName[0]}
                  </span>
                </div>
                <div>
                  <div className="font-medium  capitalize">
                    {registration.firstName} {registration.lastName}
                  </div>
                </div>
              </div>
              <a
                href={`mailto:${registration.email}`}
                className="w-[400px] text-start pl-5 flex items-center gap-1 hover:text-blue-400 duration-100"
              >
                <FaEnvelope className="text-2xl pt-1" />
                {registration.email}
              </a>
              <div className="w-[300px] text-start flex items-center gap-1">
                <FaCalendar className="text-xl" />
                <span className="">
                  {registration.event.title || "Event Title"}
                </span>
              </div>
              <div className="w-[120px] text-center">
                <span className="items-center px-3 py-1 text-base text-white">
                  {formatDistanceToNow(new Date(registration.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationList;
