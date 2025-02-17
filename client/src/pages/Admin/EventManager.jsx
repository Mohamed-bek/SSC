import React, { useState } from "react";
import { useEffect } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import DeletePopup from "../../components/DeletePopup";
import Loader from "../../components/Loader";

function EventManager() {
  const API = useAxios();
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [eventToDelete, setEventToDelete] = useState(null);

  const getEvents = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`${process.env?.REACT_APP_API_URL}event`);
      setEvents(data.events);
    } catch (error) {
      toast.error("Failed To Fetch Events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

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

  const cancelDelete = () => {
    setEventToDelete(null);
    setPopup(false);
  };

  const deleteEvent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.delete(
        process.env.REACT_APP_API_URL + `event/${eventToDelete._id}`
      );
      setEvents((prev) =>
        prev.filter((event) => event._id !== eventToDelete._id)
      );
      toast.success("Event Deleted Successfully");
      cancelDelete();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed To Delete Event");
    } finally {
      setLoading(false);
    }
  };

  const selectEventToDelete = (event) => {
    setEventToDelete(event);
    setPopup(true);
  };

  return (
    <div className="w-full h-full rounded-lg flex flex-col gap-3">
      {loading && <Loader />}
      {popup && (
        <DeletePopup
          cancel={cancelDelete}
          deleteFunc={deleteEvent}
          text="Delete Event"
          subText={`Are you sure you want to delete ${eventToDelete.title} event`}
        />
      )}
      <div>
        <ToastContainer theme="dark" />
        <div className="flex justify-between items-center px-4 py-3 rounded-lg  bg-therd">
          <h1 className="text-2xl text-secondary font-medium"> Events </h1>
          <Link
            to="add-event"
            className="flex bg-secondary items-center gap-2 text-lg font-semibold rounded-xl px-4 py-2 text-therd"
          >
            {" "}
            <FaPlus /> <span>Add Event </span>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-therd rounded-lg overflow-hidden">
        <header className="flex items-center text-secondary justify-between p-4 bg-therd border-b border-grayColor">
          <div className="w-[350px]">Name</div>
          <div className="w-[200px] text-start pl-5">Location</div>
          <div className="w-[200px] text-center">Speakers</div>
          <div className="w-[200px] text-center pl-5">Date</div>
          <div className="w-[200px] text-center pl-5">Gellery</div>
          <div className="w-[200px] text-center pl-5">Registrations</div>
          <div className="w-[120px] text-center">Manage</div>
        </header>
        <div className=" overflow-y-auto flex-1">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex items-center justify-between p-4 py-2 border-b font-normal text-[1.1rem] border-secondary hover:bg-black/30"
            >
              <div className="w-[350px] flex items-center gap-2">
                <img
                  className="w-14 h-14 rounded-full cursor-pointer"
                  src={event?.image || "/default-avatar.jpg"}
                  // onClick={() => setSelectedUser(member)}
                />
                {event?.title}
              </div>
              <div className="w-[200px] text-start pl-5">{event.location}</div>
              <div className="w-[200px] flex items-center justify-center gap-2">
                {" "}
                {event.speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="w-12 h-12  rounded-full border-2 border-secondary overflow-hidden"
                  >
                    <img
                      src={speaker?.image || "/speaker-placeholder.png"}
                      alt={`${speaker?.firstName} ${speaker?.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}{" "}
              </div>
              <div className="w-[200px] text-center">
                {formatEventDates(event.date.start, event.date?.end)}
              </div>
              <div className="w-[200px] text-center pl-5">
                {" "}
                <Link
                  to={`gallery/${event._id}`}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white text-lg font-medium"
                >
                  Gallery
                </Link>{" "}
              </div>
              <div className="w-[200px] text-center pl-5">
                {" "}
                <Link
                  to={`registrations/${event._id}`}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white text-lg font-medium"
                >
                  Registrations
                </Link>{" "}
              </div>
              <div className="w-[120px] text-center flex items-center justify-center gap-2">
                <Link
                  title="delete"
                  to={`update-event/${event._id}`}
                  className="text-blue-500 ml-2"
                >
                  <FaPen />
                </Link>
                <button
                  title="delete"
                  onClick={() => selectEventToDelete(event)}
                  className="text-red-500 ml-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventManager;
