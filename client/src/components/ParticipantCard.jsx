import React from "react";
// import { AlertCircle, Mail, Github, Linkedin, Globe, Wave } from "lucide-react";
import {
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaWaveSquare,
  FaXRay,
} from "react-icons/fa";

const ParticipantCard = ({ participant }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="w-72 rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="relative">
        {/* Image Container */}
        <div className="h-64 w-full relative">
          <img
            src={participant?.image || "/api/placeholder/300/300"}
            alt={`${participant.firstName} ${participant.lastName}`}
            className="w-full h-full object-cover"
          />
          {/* Status Badge */}
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(
              participant.status
            )}`}
          >
            {participant.status}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Name and Description */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {participant.firstName} {participant.lastName}
            </h3>
            {participant.description && (
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {participant.description}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            {participant.email && (
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="w-4 h-4 mr-2" />
                <span className="text-sm truncate">{participant.email}</span>
              </div>
            )}
            {participant.phoneNumber && (
              <div className="flex items-center text-gray-600">
                <FaXRay className="w-4 h-4 mr-2" />
                <span className="text-sm">{participant.phoneNumber}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaLinkedin className="w-5 h-5 text-blue-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaGithub className="w-5 h-5 text-gray-900" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaGlobe className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Contact Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
            <span>Say Hello!</span>
            <FaWaveSquare className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantCard;
