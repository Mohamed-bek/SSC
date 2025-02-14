import React, { useState } from "react";
import { FaCalendar, FaFolderPlus, FaPlus, FaUsers } from "react-icons/fa";
import ChartComponent from "../../components/ChartComponent";
import { useAdminContext } from "../../context/Admin";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";

function Statistics() {
  const API = useAxios();
  const { admin } = useAdminContext();
  const [visitors, setVisitors] = useState(13400000);
  const [members, setMembers] = useState(100);
  const [participants, setParticipants] = useState(470);
  const [events, setEvents] = useState(12);
  const [projects, setProjects] = useState(120);
  const [analytics, setAnalytics] = useState({
    counts: [0, 0, 2, 0, 0, 1],
    months: [
      "Sep 2024",
      "Oct 2024",
      "Nov 2024",
      "Dec 2024",
      "Jan 2025",
      "Feb 2025",
    ],
  });

  useEffect(() => {
    const getStatics = async () => {
      try {
        const { data } = await API.get(
          `${process.env.REACT_APP_API_URL}statics`
        );
        setVisitors(data.visitors);
        setEvents(data.events);
        setProjects(data.projects);
        setMembers(data.members);
        setParticipants(data.participants);
      } catch (error) {
        console.log(error);
      }
    };
    const getAnalytics = async () => {
      try {
        const { data } = await API.get(
          `${process.env.REACT_APP_API_URL}analytics`
        );
        setAnalytics(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatics();
    getAnalytics();
  }, [visitors, members, participants, projects, events]);

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    }
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }
    return number;
  };

  const data = {
    labels: analytics.months,
    datasets: [
      {
        label: "User ",
        data: analytics.counts,
        backgroundColor: "#dfc0ff",
        borderColor: "#dfc0ff",
        borderWidth: 3,
        barThickness: 30,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "#e0c0ff32",
        },
        ticks: {
          color: "#dfc0ff",
          // Change Y-axis labels color
        },
        borderColor: "#dfc0ff", // Y-axis line color
      },
      x: {
        grid: {
          display: true,
          color: "#e0c0ff32",
        },
        ticks: {
          color: "#dfc0ff", // Change Y-axis labels color
        },
        borderColor: "#dfc0ff", // Y-axis line color
      },
    },
  };

  return (
    <div className="w-full h-full p-3 relative">
      <div className="py-2 px-5 rounded-lg bg-therd text-secondary shadow-sm flex justify-between items-center mb-3">
        <div>
          <h2 className="text-xl font-bold mb-0.5">
            Welcome Back, {admin?.firstName}
          </h2>
          <p className="text-sm font-light"> Let's Do Some Work Today... </p>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden bg-grayColor text-therd">
          <img
            className="w-full h-full object-cover"
            alt={admin?.firstName || "Admin"}
            src={admin?.image}
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-3 mb-3">
        <div className="bg-therd flex justify-between  flex-1 items-start p-4 rounded-lg">
          <div>
            <h3 className="font-bold text-3xl mb-0.5">
              {formatNumber(visitors)}
            </h3>
            <p className="pl-1 text-lg font-light"> Vistor </p>
          </div>
          <FaUsers className="text-[3.25rem] bg-[#e0c0ff3c] rounded-full p-1.5" />
          {/* <img className="w-14" src="/visitorsIcons.png" /> */}
        </div>
        <div className="bg-therd flex justify-between  flex-1 items-start p-4 rounded-lg">
          <div>
            <h3 className="font-bold text-3xl mb-0.5">
              {formatNumber(members)}
            </h3>
            <p className="pl-1 text-lg font-light"> Members </p>
          </div>
          <FaUsers className="text-[3.25rem] bg-[#e0c0ff3c] rounded-full p-1.5" />
          {/* <img className="w-14" src="/visitorsIcons.png" /> */}
        </div>
        <div className="bg-therd flex justify-between  flex-1 items-start p-4 rounded-lg">
          <div>
            <h3 className="font-bold text-3xl mb-0.5">
              {formatNumber(participants)}
            </h3>
            <p className="pl-1 text-lg font-light"> Participants </p>
          </div>
          <FaUsers className="text-[3.25rem] bg-[#e0c0ff3c] rounded-full p-1.5" />
          {/* <img className="w-14" src="/visitorsIcons.png" /> */}
        </div>
        <div className="bg-therd flex justify-between  flex-1 items-start p-4 rounded-lg">
          <div>
            <h3 className="font-bold text-3xl mb-0.5">
              {formatNumber(events)}
            </h3>
            <p className="pl-1 text-lg font-light"> Events </p>
          </div>
          <FaUsers className="text-[3.25rem] bg-[#e0c0ff3c] rounded-full p-1.5" />
          {/* <img className="w-14" src="/visitorsIcons.png" /> */}
        </div>
        <div className="bg-therd flex justify-between  flex-1 items-start p-4 rounded-lg">
          <div>
            <h3 className="font-bold text-3xl mb-0.5">
              {formatNumber(projects)}
            </h3>
            <p className="pl-1 text-lg font-light"> Projects </p>
          </div>
          <FaUsers className="text-[3.25rem] bg-[#e0c0ff3c] rounded-full p-1.5" />
          {/* <img className="w-14" src="/visitorsIcons.png" /> */}
        </div>
      </div>
      <div className="flex h-[570px] items-start justify-between gap-3">
        <div className="bg-therd  flex-[2] h-full flex justify-center items-center rounded-lg p-4">
          {" "}
          <ChartComponent data={data} options={options} type="line" />{" "}
        </div>
        <div className="flex-1 flex flex-col justify-between items-stretch h-full gap-3">
          <div className="bg-therd rounded-lg p-6 cursor-pointer group relative overflow-hidden flex-1">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#e0c0ff32] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-[#e0c0ff32] p-2 rounded-lg ">
                  <FaUsers className="w-8 h-8 text-secondary" />
                </div>
                <Link to="manage-members/add-member">
                  <FaPlus className="w-5 h-5 text-secondary/70 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <h4 className="text-secondary text-lg font-semibold mb-1">
                Add New Member
              </h4>
              <p className="text-secondary/70 text-sm">
                Create member profiles and assign roles
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-400" />
                  <div className="w-8 h-8 rounded-full bg-purple-300" />
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-sm font-medium">
                    +5
                  </div>
                </div>
                <span className="text-secondary/70 text-sm">
                  8 members added today
                </span>
              </div>
            </div>
          </div>

          <div className="bg-therd rounded-lg p-6 cursor-pointer group relative overflow-hidden flex-1">
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#e0c0ff32] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-[#e0c0ff32] p-2 rounded-lg">
                  <FaCalendar className="w-7 h-7 text-secondary" />
                </div>
                <Link to="manage-events/add-event">
                  <FaPlus className="w-5 h-5 text-secondary/70 group-hover:rotate-90 transition-transform" />
                </Link>
              </div>

              <h4 className="text-secondary text-lg font-semibold mb-1">
                New Event
              </h4>
              <p className="text-secondary/70 text-sm">
                2 events scheduled this week
              </p>
            </div>
          </div>

          <div className="bg-therd flex-1 rounded-lg p-6 cursor-pointer group relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-[#e0c0ff32] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-[#e0c0ff32] p-2 rounded-lg">
                  <FaFolderPlus className="w-7 h-7 text-secondary" />
                </div>
                <Link to="manage-projects/add-project">
                  <FaPlus className="w-5 h-5 text-secondary/70 group-hover:rotate-90 transition-transform" />
                </Link>
              </div>

              <h4 className="text-secondary text-lg font-semibold mb-1">
                Create Project
              </h4>
              <p className="text-secondary/70 text-sm">5 active projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
