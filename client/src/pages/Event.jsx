import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    const getEvent = async () => {
      setEvent({
        _id: "1",
        title: "React Advanced Workshop 2025",
        image: "/univ.jpg",
        location: "Tech Hub, Silicon Valley",
        date: {
          start: "2025-03-15T09:00:00",
          end: "2025-03-15T17:00:00",
        },
        description:
          "Join us for an intensive workshop on advanced React patterns, hooks, and performance optimization techniques. Perfect for senior developers looking to level up their React skills.",
        speakers: [
          {
            firstName: "Sarah",
            lastName: "Johnson",
            image: "/me.png",
          },
          {
            firstName: "Michael",
            lastName: "Chen",
            image: "/me.png",
          },
          {
            firstName: "Michael",
            lastName: "Chen",
            image: "/me.png",
          },
          {
            firstName: "Michael",
            lastName: "Chen",
            image: "/me.png",
          },
        ],
      });
    };
    getEvent();
  }, [id]);

  useEffect(() => {
    if (!event?.date?.start) return;

    const updateTimer = () => {
      const now = new Date();
      const startTime = new Date(event?.date?.start);
      const timeDiff = startTime - now;

      if (timeDiff <= 0) {
        setTimeLeft(-1);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [event]);

  const formatDate = (date) => {
    if (!date) return "Unknown date";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "Invalid date";
    return format(parsedDate, "dd MMMM yyyy");
  };

  const isEventPassed =
    new Date(event?.date?.end || event?.date?.start) < new Date();

  return (
    <div className="min-h-screen bg-therd overflow-y-auto">
      <div className="relative h-[70vh] mb-20">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img
          src={event?.image || "/default-event.jpg"}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        {isEventPassed && (
          <div className="absolute top-10 right-7 z-40 px-4 py-2 bg-therd text-secondary rounded-md text-lg font-medium">
            Event Completed
          </div>
        )}
        <div className="mt-6 p-4 rounded-lg text-center font-luckiest flex items-center justify-around mx-auto max-w-5xl cont absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 shadow-lg bg-secondary text-therd">
          <div className="px-5">
            <h2 className="text-[4rem] font-luckiest tracking-wider scale-110">
              {timeLeft?.days}
            </h2>
            <h3 className="text-lg scale-y-125 -mt-3"> Days </h3>
          </div>
          <div className="px-5">
            <h2 className="text-[4rem] font-luckiest tracking-wider scale-110">
              {timeLeft?.hours}
            </h2>
            <h3 className="text-lg scale-y-125 -mt-3"> Hours </h3>
          </div>
          <div className="px-5">
            <h2 className="text-[4rem] font-luckiest tracking-wider scale-110">
              {timeLeft?.minutes}
            </h2>
            <h3 className="text-lg scale-y-125 -mt-3"> Minutes </h3>
          </div>
          <div className="px-5">
            <h2 className=" text-[4rem] font-luckiest tracking-wider scale-110">
              {timeLeft?.seconds}
            </h2>
            <h3 className="text-lg  scale-y-125 -mt-3"> Seconds </h3>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="cont items-center flex flex-col md:flex-row md:justify-evenly md:items-center text-lg text-therd gap-4 mb-5 font-semibold max-w-5xl">
          <div className="flex items-center justify-center bg-secondary rounded-lg py-2.5 px-4 gap-3 w-[370px]">
            <FaCalendar className="w-6 h-6" />
            <span>
              {event?.date?.start ? formatDate(event?.date.start) : "TBD"}
              {event?.date?.end ? ` - ${formatDate(event?.date.end)}` : ""}
            </span>
          </div>
          <div className="flex items-center justify-center bg-secondary rounded-lg py-2.5 px-4 gap-3 w-[370px]">
            <FaLocationDot className="w-6 h-6" />
            <span>{event?.location}</span>
          </div>
        </div>
      </div>

      {/* {Contente } */}
      <div className="w-full py-5">
        <h3 className="bg-secondary text-therd w-fit text-xl rounded-full font-medium mx-auto py-2 px-5 mb-5">
          Welcome To {event?.title} Event
        </h3>
        <p className="text-secondary max-w-5xl px-10 w-full text-xl font-medium text-center mx-auto mb-5">
          {event?.description}
        </p>
        {event?.speakers && event?.speakers?.length > 0 && (
          <div className="cont mx-auto bg-secondary rounded-xl shadow-xl p-5">
            <h2 className="text-3xl font-bold text-therd mb-5 text-center">
              Featured Speakers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-therd p-5 rounded-xl">
              {event?.speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl bg-secondary p-6 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-[3px] border-therd shadow-lg bg-white">
                        <img
                          src={speaker?.image || "/default-speaker.jpg"}
                          alt={`${speaker?.firstName} ${speaker?.lastName}`}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                      {speaker?.firstName} {speaker?.lastName}
                    </h3>
                    <div className="h-1 w-20 bg-therd rounded-full transform origin-center group-hover:scale-x-150 transition-transform duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
