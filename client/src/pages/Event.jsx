import React, { useEffect, useState } from "react";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import { useParams, Link } from "react-router-dom";
import EventRegistration from "../components/EventRegistration";
import Loader from "../components/Loader";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  const GetEvent = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}event/${id}`
      );
      setEvent(data.event);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetEvent();
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

  const formatEventDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (!end) {
      return `${start.getDate()} ${start.toLocaleString("default", {
        month: "short",
      })} ${start.getFullYear()}`;
    }

    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.getDate()} - ${end.getDate()} ${start.toLocaleString(
        "default",
        { month: "short" }
      )} ${start.getFullYear()}`;
    }

    return `${start.getDate()} ${start.toLocaleString("default", {
      month: "short",
    })} - ${end.getDate()} ${end.toLocaleString("default", {
      month: "short",
    })} ${start.getFullYear()}`;
  };

  const isEventPassed =
    new Date(event?.date?.end || event?.date?.start) < new Date();

  return (
    <div className="min-h-dvh bg-therd overflow-y-auto">
      {loading && <Loader />}
      {visible && (
        <EventRegistration
          event={event}
          setVisible={setVisible}
          setLoading={setLoading}
        />
      )}
      <div className="relative h-[60vh] mb-10 md:mb-20">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img
          src={event?.image || "/default-event.jpg"}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        {isEventPassed ? (
          <Link
            to={`/gallery/${event._id}`}
            className="absolute top-3 right-10 z-40 px-4 py-2 bg-secondary text-therd rounded-md text-lg font-medium"
          >
            Event Completed
          </Link>
        ) : (
          <button
            onClick={() => setVisible(true)}
            className=" absolute top-3 right-10 bg-secondary px-5 py-2 rounded-lg text-therd cursor-pointer text-xl font-semibold z-20 hover:bg-grayColor duration-100"
          >
            {" "}
            Register{" "}
          </button>
        )}
        <div className="h-[80px] md:h-[100px] rounded-lg text-center font-luckiest  max-w-5xl w-[90%] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 shadow-lg bg-secondary text-therd">
          {isEventPassed ? (
            <h2 className="text-red-500 text-xl md:text-4xl font-semibold font-inter capitalize  h-full flex justify-center items-center">
              {" "}
              This event has ended. Stay tuned for more!{" "}
            </h2>
          ) : timeLeft === -1 ? (
            <h2 className="text-green-600 text-xl md:text-4xl font-semibold font-inter capitalize h-full flex justify-center items-center">
              {" "}
              This event is ongoing ,don't miss out!
            </h2>
          ) : (
            <div className="flex items-center justify-around h-full md:pt-6">
              <div className="px-2  md:px-5">
                <h2 className="text-4xl md:text-[4rem] font-luckiest tracking-wider scale-110">
                  {timeLeft?.days || "20"}
                </h2>
                <h3 className="text-sm md:text-lg scale-y-125 -mt-2 md:mt-1">
                  {" "}
                  Days{" "}
                </h3>
              </div>
              <div className="px-2 md:px-5">
                <h2 className="text-4xl md:text-[4rem] font-luckiest tracking-wider scale-110">
                  {timeLeft?.hours}
                </h2>
                <h3 className="text-sm md:text-lg scale-y-125 -mt-2 md:mt-1">
                  {" "}
                  Hours{" "}
                </h3>
              </div>
              <div className="px-2 md:px-5">
                <h2 className="text-4xl md:text-[4rem] font-luckiest tracking-wider scale-110">
                  {timeLeft?.minutes}
                </h2>
                <h3 className="text-sm md:text-lg scale-y-125 -mt-2 md:mt-1">
                  {" "}
                  Minutes{" "}
                </h3>
              </div>
              <div className="px-2 md:px-5">
                <h2 className="text-4xl md:text-[4rem] font-luckiest tracking-wider scale-110">
                  {timeLeft?.seconds}
                </h2>
                <h3 className="text-sm md:text-lg scale-y-125 -mt-2 md:mt-1">
                  {" "}
                  Seconds{" "}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="py-5">
        <div className="cont items-center flex flex-col md:flex-row md:justify-evenly md:items-center text-sm md:text-lg text-therd gap-4 mb-5 font-semibold max-w-5xl">
          <div className="flex items-center justify-center bg-secondary rounded-lg py-2.5 px-4 gap-3 w-[280px] md:w-[370px]">
            <FaCalendar className="w-6 h-6" />
            <span className="text-nowrap">
              {formatEventDates(event?.date?.start, event?.date?.end)}
            </span>
          </div>
          <div className="flex items-center justify-center bg-secondary rounded-lg py-2.5 px-4 gap-3 w-[280px] md:w-[370px]">
            <FaLocationDot className="w-6 h-6" />
            <span>{event?.location}</span>
          </div>
        </div>
      </div>

      {/* {Contente } */}
      <div className="w-full py-5">
        <h3 className="bg-secondary text-therd w-fit text-center text-lg md:text-xl rounded-full font-medium mx-auto py-2 px-3 md:px-5 mb-5">
          Welcome To {event?.title} Event
        </h3>
        <p className="text-secondary max-w-5xl px-3 md:px-10 w-full text-base  md:text-xl font-light md:font-medium text-center mx-auto mb-5">
          {event?.description}
        </p>
        {event?.speakers && event?.speakers?.length > 0 && (
          <div className="w-[90%] mx-auto bg-secondary rounded-xl shadow-xl p-1 md:p-5">
            <h2 className="text-2xl md:text-3xl font-bold text-therd mb-2 md:mb-5 text-center">
              Featured Speakers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 bg-therd p-2 md:p-5 rounded-xl">
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
