import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loader from "../components/Loader";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const GetEvents = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}event`,
        {
          params: {
            page: 1,
            limit: 12,
            type,
          },
        }
      );
      setEvents(data.events);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetEvents();
  }, [type]);
  return (
    <div className="min-h-[calc(100dvh-82px)] w-full bg-therd pt-2 md:pt-10">
      <div className="w-full px-4 mx-auto md:w-[90%] pb-10">
        {isLoading && <Loader />}
        <div className="text-center mb-0 items-center flex justify-between mx-auto">
          <div>
            <h1 className="PageHeader !text-3xl  md:!text-5xl">Our Events</h1>
          </div>
          <div className="mb-6">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="focus:outline-none w-[140px] md:w-[180px] mt-2 md:mb-4 font-medium px-3 py-2 text-therd bg-grayColor rounded-lg"
            >
              <option value=""> All </option>
              <option value="upcoming"> Upcoming </option>
              <option value="ongoing"> Ongoing </option>
              <option value="old"> Old </option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-10 px-2 md:px-0">
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
