import React, { useState, useEffect, useRef } from "react";
import InputFieldCustom from "../../components/InputFieldCustom";
import ParticipantCard from "../../components/ParticipantCard";
import useAxios from "../../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
const ClubMembers = () => {
  const API = useAxios();
  const [participants, setParticipants] = useState([]);
  const [NbOfPages, setNbOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const getParticipants = async () => {
    try {
      const { data } = await API.get(
        process.env.REACT_APP_API_URL + "participant/all",
        {
          params: {
            page: currentPage,
            status,
            limit: 10,
            firstName: searchQuery.split(" ")[0],
            lastName: searchQuery.split(" ")[1],
          },
        }
      );
      setParticipants(data.participants);
      setNbOfPages(data.NbOfPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParticipants();
  }, [searchQuery, currentPage, NbOfPages, status]);

  const handleAccept = async (_id) => {
    try {
      await API.put(`${process.env.REACT_APP_API_URL}participant/${_id}`, {
        status: "accepted",
      });
      toast.success("The Participant Approved");
      setParticipants(
        participants.map((p) =>
          p._id === _id ? { ...p, status: "accepted" } : p
        )
      );
    } catch (error) {
      toast.error("Failed To Approve");
    }
  };

  const handleReject = async (_id) => {
    try {
      await API.put(`${process.env.REACT_APP_API_URL}participant/${_id}`, {
        status: "rejected",
      });
      toast.success("The Participant Rejected Successfully");
      setParticipants(
        participants.map((p) =>
          p._id === _id ? { ...p, status: "rejected" } : p
        )
      );
    } catch (error) {
      toast.error("Failed To Reject");
    }
  };

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

  return (
    <div className="w-full h-full overflow-y-auto relative bg-secondary p-3">
      <ToastContainer theme="dark" />
      <div className="flex flex-col gap-3 h-full">
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99]">
            <div className="user-card-overlay">
              <ParticipantCard participant={selectedUser} />
            </div>
          </div>
        )}

        {/* {Start Frommm Here } */}

        <div className="w-full bg-therd rounded-lg flex items-center justify-between px-5 py-2">
          <InputFieldCustom
            type="text"
            value={searchQuery}
            setValue={handleSearchChange}
            placeholder="Search by title..."
            name="searchQuery"
            styles="!w-[230px] !py-1.5"
          />
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 bg-grayColor text-therd border border-primary cursor-pointer rounded-lg focus:outline-none"
          >
            <option value="">All Users</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="flex-1 bg-therd rounded-lg overflow-hidden flex flex-col ">
          <header className="flex items-center text-secondary border-b border-grayColor justify-between p-4 bg-therd">
            <div className="flex-1 min-w-[300px]">Full Name</div>
            <div className="w-[400px] text-start">Email</div>
            <div className="w-[200px] text-center">PhoneNumber</div>
            <div className="w-[180px] text-center">Joined Us</div>
            <div className="flex-1 text-center">Manage</div>
          </header>

          <div className=" overflow-y-auto flex-1 w-ful">
            {participants.map((participant) => (
              <div
                key={participant._id}
                className="flex items-center justify-between p-4 py-2 border-b font-normal text-[1.1rem] border-secondary hover:bg-black/30"
              >
                <div className="flex-1 min-w-[300px] flex items-center gap-2">
                  <img
                    className="w-14 h-14 rounded-full cursor-pointer"
                    src={participant?.image || "/default-avatar.jpg"}
                    onClick={() => setSelectedUser(participant)}
                  />
                  {participant?.firstName + " " + participant?.lastName}
                </div>
                <div className="w-[400px] text-start">{participant?.email}</div>
                <div className="w-[200px] text-base text-center">
                  {participant?.phoneNumber}
                </div>
                <div className="w-[180px] text-center">
                  {new Date(participant?.createdAt).toLocaleDateString()}
                </div>
                {participant.status === "pending" ? (
                  <div className="flex flex-1 justify-center items-center gap-2">
                    <button
                      onClick={() => handleAccept(participant._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-300 ease-in-out"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(participant._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300 ease-in-out"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div
                    className={`flex-1 text-center text-xl font-normal capitalize ${
                      participant.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    } `}
                  >
                    {" "}
                    {participant.status}{" "}
                  </div>
                )}
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
    </div>
  );
};

export default ClubMembers;
