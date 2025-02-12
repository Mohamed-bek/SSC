import React, { useState } from "react";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([
    {
      _id: "1",
      title: "React Advanced Workshop 2025",
      image: "/univ.jpg",
      location: "Tech Hub, Silicon Valley",
      date: {
        start: new Date("2025-03-15T09:00:00"),
        end: new Date("2025-03-15T17:00:00"),
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
      ],
    },
    {
      _id: "2",
      title: "AI & Machine Learning Conference",
      image: "/univ.jpg",
      location: "Digital Innovation Center, New York",
      date: {
        start: new Date("2025-04-20T10:00:00"),
        end: new Date("2025-04-22T18:00:00"),
      },
      description:
        "Three days of cutting-edge AI and ML talks, workshops, and networking opportunities. Featured topics include deep learning, NLP, and ethical AI development.",
      speakers: [
        {
          firstName: "Emily",
          lastName: "Williams",
          image: "/me.png",
        },
      ],
    },
    {
      _id: "3",
      title: "Web3 & Blockchain Summit",
      image: "/univ.jpg",
      location: "Crypto Convention Center, Miami",
      date: {
        start: new Date("2025-05-10T09:30:00"),
        end: new Date("2025-05-11T17:30:00"),
      },
      description:
        "Explore the future of Web3 technologies, DeFi, and blockchain development. Connect with industry leaders and innovative startups.",
      speakers: [
        {
          firstName: "David",
          lastName: "Garcia",
          image: "/me.png",
        },
        {
          firstName: "Ana",
          lastName: "Patel",
          image: "/me.png",
        },
        {
          firstName: "James",
          lastName: "Wilson",
          image: "/me.png",
        },
      ],
    },
    {
      _id: "4",
      title: "DevOps & Cloud Native Day",
      image: "/univ.jpg",
      location: "Cloud Center, Seattle",
      date: {
        start: new Date("2025-06-05T08:00:00"),
        end: new Date("2025-06-05T18:00:00"),
      },
      description:
        "A full day dedicated to modern DevOps practices, cloud native technologies, and container orchestration. Hands-on workshops included.",
      speakers: [
        {
          firstName: "Michelle",
          lastName: "Zhang",
          image: "/me.png",
        },
        {
          firstName: "Robert",
          lastName: "Taylor",
          image: "/me.png",
        },
      ],
    },
  ]);
  return (
    <div className="min-h-[calc(100dvh-82px)] w-full bg-therd pt-10">
      <div className="cont pb-10">
        <h2 className="PageHeader">Upconiming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-10">
          {events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
