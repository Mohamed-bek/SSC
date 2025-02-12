import React from "react";
import { Link } from "react-router-dom";
import { BiCalendar, BiMap } from "react-icons/bi";
import { format } from "date-fns";

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return format(new Date(date), "MMM dd, yyyy");
  };

  return (
    <div className="bg-secondary w-full p-3 rounded-lg">
      <div className="relative">
        <div className="h-[200px] overflow-hidden bg-white rounded-lg relative">
          <img
            src={event.image || "/event-placeholder.png"}
            alt={event.title}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          <div className="absolute top-2 left-2 bg-therd text-secondary px-3 py-1 rounded-full text-sm font-medium">
            <div className="flex items-center gap-1">
              <BiCalendar className="w-4 h-4" />
              <span>{formatDate(event.date.start)}</span>
            </div>
          </div>
        </div>

        <div className="text-therd pt-2.5">
          <h2 className="text-xl font-semibold line-clamp-1">{event.title}</h2>

          <div className="flex items-center gap-1 text-therd text-sm mb-2">
            <BiMap className="w-4 h-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {event.description}
          </p>

          <div className="w-full h-[1px] bg-therd mb-3" />

          {event.speakers && event.speakers.length > 0 && (
            <div className="flex mb-3 -space-x-2">
              {event.speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-secondary overflow-hidden"
                >
                  <img
                    src={speaker.image || "/speaker-placeholder.png"}
                    alt={`${speaker.firstName} ${speaker.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <span className="flex items-center justify-center pl-2.5 text-sm">
                Speakers
              </span>
            </div>
          )}

          <Link
            to={`/event/${event._id}`}
            className="w-full py-2 text-center bg-therd text-secondary rounded-md flex justify-center items-center text-lg font-medium hover:bg-opacity-90 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
