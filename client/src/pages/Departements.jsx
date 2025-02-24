import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function Departements() {
  const departementsRef = useRef([]);
  const [departments, setDepartments] = useState([]);
  const GetDepartmentns = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}department`
      );
      setDepartments(data.departments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetDepartmentns();
  }, []);
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
  }, [departments]);

  return (
    <div className="w-full min-dvh bg-therd pt-3 md:pt-10">
      <h2 className="PageHeader text-secondary py-2"> Our Departements </h2>
      <div className="px-4 md:px-10 mx-auto text-secondary pb-10 ">
        {departments.length > 0 &&
          departments.map((departement, i) => (
            <div
              ref={(el) => (departementsRef.current[i] = el)}
              className={`flex justify-center items-center flex-col md:flex-row gap-5 md:gap-10 w-full flex-wrap lg:flex-nowrap  mt-10`}
              key={i}
              dir={i % 2 === 0 ? "ltr" : "rtl"}
            >
              <div
                className={`w-full max-h-[440px] overflow-hidden rounded-lg md:min-w-[600px]  lg:w-[650px] opacity-0 translate-y-20 imageCont`}
              >
                <img
                  alt={departement?.name}
                  src={departement?.image?.secure_url}
                  className="w-full object-cover rounded-md"
                />
              </div>
              <div dir="ltr" className="flex-1 text-left pt-3 max-w-3xl">
                <h3 className="text-[1.7rem] md:text-[2.85rem] lg:text-[3.1rem] scale-y-125 tracking-wide text-wrap font-inter uppercase font-black textTran mb-3 flex">
                  {departement?.name?.split("").map((e, i) => (
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
                    animationDelay: `${departement?.name?.length * 50 + 50}ms`,
                  }}
                  className="text-base md:text-xl pb-3 font-normal opacity-0 translate-y-10 block "
                >
                  {departement.description}
                </p>
                <h4
                  style={{
                    animationDelay: `${departement?.name?.length * 50 + 200}ms`,
                  }}
                  className="text-xl md:text-2xl pb-1 mb-2 capitalize font-medium opacity-0 translate-y-10"
                >
                  🚀 responsibilities :{" "}
                </h4>
                <ul>
                  {departement.responsibilities.map((res, i) => (
                    <li
                      style={{
                        animationDelay: `${
                          i * 150 + (departement?.name?.length * 50 + 500)
                        }ms`,
                      }}
                      className="text-sm mb-2.5 text-[#d8d8d8] md:text-[1.1rem] font-light opacity-0 translate-y-10"
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
