import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ParticipantsList = () => {
  const [participants, setParticipants] = useState([
   
  ]);

  const getParticipants = async () => {
    try {
        const {data} = await axios.get(process.env.REACT_APP_API_URL + 'participant/all'  , {
            params: {
                page : 1,
                status : null,
                limit : 10
            }
        });
        setParticipants(data.participants);
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {getParticipants()},[])

  const handleAccept = (_id) => {
    setParticipants(participants.map(p => 
      p._id === _id ? { ...p, status: 'accepted' } : p
    ));
  };

  const handleReject = (_id) => {
    setParticipants(participants.map(p => 
      p._id === _id ? { ...p, status: 'rejected' } : p
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">Participants List</h1>
      {participants.map((participant) => (
        <div 
          key={participant._id} 
          className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
        >
          <div className="flex-grow overflow-h_idden">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg truncate">
                {participant.firstName} {participant.lastName}
              </span>
              <span className="text-sm text-gray-500 truncate">
                {participant.email}
              </span>
              <span className="text-sm text-gray-500 truncate">
                {participant.phoneNumber}
              </span>
            </div>
          </div>
          {participant.status === 'pending' && (
            <div className="flex space-x-2 ml-4">
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
          )}
        </div>
      ))}
    </div>
  );
};

export default ParticipantsList;