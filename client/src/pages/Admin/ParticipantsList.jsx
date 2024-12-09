import React, { useState } from 'react';

const ParticipantsList = () => {
  const [participants, setParticipants] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1 (555) 123-4567',
      status: 'pending'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+1 (555) 987-6543',
      status: 'pending'
    }
  ]);

  const handleAccept = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, status: 'accepted' } : p
    ));
  };

  const handleReject = (id) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, status: 'rejected' } : p
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-6">Participants List</h1>
      {participants.map((participant) => (
        <div 
          key={participant.id} 
          className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
        >
          <div className="flex-grow overflow-hidden">
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
                onClick={() => handleAccept(participant.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-300 ease-in-out"
              >
                Accept
              </button>
              <button 
                onClick={() => handleReject(participant.id)}
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