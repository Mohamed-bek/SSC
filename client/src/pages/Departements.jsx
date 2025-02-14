import React, { useEffect, useRef } from "react";

function Departements() {
  const departementsRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-LR");
          }
        });
      },
      { threshold: 0.7 }
    );

    departementsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      departementsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const departements = [
    {
      title: "Sessions & Workshops",
      description:
        "The Sessions & Workshops department focuses on enhancing learning through interactive sessions and hands-on workshops. Our goal is to equip members with valuable skills and practical knowledge that contribute to their personal and professional growth",
      responsibilities: [
        "Organizing informative sessions on relevant topics",
        "Conducting hands-on workshops to develop technical skills.",
        " Offering structured training programs for in-depth learning.",
        "Encouraging collaboration and mentorship among members.",
      ],
      image: "/workshop.jpg",
      resume:
        "This department ensures that learning is not just theoretical but also practical, engaging, and impactful.",
    },
    {
      title: "Events & Activities",
      description:
        "The Events & Activities department plays a key role in fostering community engagement and collaboration through well-planned events and challenges. Our focus is on creating interactive and enriching experiences that bring members together and enhance their skills.",
      responsibilities: [
        "Planning and coordinating club events to encourage participation.",
        "Organizing skill-building challenges that inspire learning and growth.",
        "Hosting collaborative events with other clubs and organizations to expand our network.",
        "Providing diverse experiences that make the club more dynamic and engaging.",
      ],
      image: "/events.jpg",
      resume:
        "Through these activities, we aim to build a vibrant and connected community where members can learn, network, and grow together.",
    },
    {
      title: "Freelance & Business",
      description:
        "The Freelance & Business department equips members with the essential skills needed to succeed in freelancing and business development. Our goal is to help members navigate the freelance world with confidence and an entrepreneurial mindset.",
      responsibilities: [
        "Identifying freelance opportunities on various platforms.",
        "Creating competitive profiles and proposals to attract clients.",
        "Developing a strategic business mindset for long-term success.",
        "Enhancing negotiation and client management skills to build strong professional relationships.",
      ],
      image: "/freelance.jpg",
      resume:
        "This department empowers members to turn their skills into opportunities, grow their careers independently, and thrive in the freelance industry.",
    },
    {
      title: "External Relations",
      description:
        "The External Relations department manages the club’s outreach efforts, fostering meaningful connections with organizations and securing sponsorships to support club initiatives.",
      responsibilities: [
        "Collaborating with other clubs to share resources and expand opportunities.",
        "Securing sponsorships to meet financial needs and sustain club activities.",
        "Building partnerships with organizations to enhance member experiences.",
        "Welcoming guest facilitators and providing necessary support for their contributions.",
      ],
      image: "/relations.jpg",
      resume:
        "This department plays a vital role in strengthening the club’s presence, ensuring sustainability, and creating valuable opportunities for members through strategic collaborations.",
    },
    {
      title: "Social Media & Marketing",
      description:
        "The Social Media & Marketing department strengthens the club’s online presence, leveraging strategic content to engage a wider audience and build a dynamic community.",
      responsibilities: [
        "Managing social media platforms to maintain an active and engaging presence.",
        "Developing content strategies that align with the club’s vision and goals.",
        "Designing visually appealing graphics and promotional materials.",
        "Posting daily tech-related content to educate and inspire members.",
        "Overseeing the club’s communication channels to ensure consistency and engagement.",
      ],
      image: "/social.jpg",
      resume:
        "This department plays a key role in expanding the club’s reach, fostering community interaction, and maintaining a strong digital presence through impactful content and branding.",
    },
  ];
  return (
    <div className="w-full min-dvh bg-therd pt-3 md:pt-10">
      <h2 className="PageHeader text-secondary py-2"> Our Departements </h2>
      <div className="px-4 md:px-10 mx-auto text-secondary pb-10 ">
        {departements.map((departement, i) => (
          <div
            ref={(el) => (departementsRef.current[i] = el)}
            className={`flex justify-center items-center flex-col md:flex-row gap-5 md:gap-10 w-full flex-wrap mt-10`}
            key={i}
            dir={i % 2 === 0 ? "ltr" : "rtl"}
          >
            <div
              className={`w-full md:min-w-[600px]  lg:w-[650px] opacity-0 translate-y-20 imageCont`}
            >
              <img
                alt={departement?.title}
                src={departement?.image}
                className="w-full object-cover rounded-md"
              />
            </div>
            <div dir="ltr" className="flex-1 text-left pt-3 max-w-3xl">
              <h3 className="text-[1.6rem] md:text-5xl scale-y-125 tracking-wide text-wrap font-luckiest textTran mb-3 flex">
                {departement.title.split("").map((e, i) => (
                  <span
                    style={{ animationDelay: `${i * 50}ms` }}
                    className="opacity-0 translate-y-10 block"
                  >
                    {e === " " ? "\u00A0" : e}{" "}
                  </span>
                ))}
              </h3>
              <p
                style={{
                  animationDelay: `${departement.title.length * 50 + 50}ms`,
                }}
                className="text-base md:text-xl pb-3 font-normal opacity-0 translate-y-10 block "
              >
                {departement.description}
              </p>
              <h4
                style={{
                  animationDelay: `${departement.title.length * 50 + 200}ms`,
                }}
                className="text-lg md:text-2xl pb-1 capitalize font-medium opacity-0 translate-y-10"
              >
                🚀 responsibilities :{" "}
              </h4>
              <ul>
                {departement.responsibilities.map((res, i) => (
                  <li
                    style={{
                      animationDelay: `${
                        i * 150 + (departement.title.length * 50 + 500)
                      }ms`,
                    }}
                    className="text-sm mb-2 md:text-[1.1rem] font-normal opacity-0 translate-y-10"
                  >
                    ✅ {res}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Departements;
