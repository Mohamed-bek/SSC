import React from "react";
import { Link } from "react-router-dom";

function Fotter() {
  const links = [
    { id: 0, to: "", name: "Home" },
    { id: 1, to: "/events", name: "Events" },
    { id: 2, to: "/projects", name: "Projects" },
    { id: 3, to: "/members", name: "Members" },
    { id: 4, to: "/departements", name: "Departments" },
  ];

  return (
    <div className="w-full pt-10 pb-5 bg-therd text-secondary border-t-[0.5px] border-grayColor">
      <div className="flex items-center justify-between w-[90%] mx-auto flex-col gap-7 md:flex-row">
        <div className="w-fit flex justify-center items-center gap-5 h-20">
          <img
            loading="lazy"
            alt="SCC Logo"
            src="/logo.png"
            className=" h-full"
          />
          <div className="w-2 rounded-lg bg-secondary h-full"></div>
          <h3 className="text-xl font-luckiest scale-y-150 pt-0 uppercase leading-5 tracking-wider">
            Start
            <br />
            Coding
            <br />
            Club
          </h3>
        </div>
        <div className="flex items-center -order-1 md:order-none flex-col gap-1 md:gap-0 md:flex-row">
          {links.map((link, i) => (
            <Link
              className={`px-3 font-semibold text-lg text-grayColor hover:text-secondary duration-100`}
              to={link.to}
              key={link.id}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="w-fit flex justify-center items-center gap-5 text-2xl text-secondary">
          <Link
            target="_blank"
            to="https://www.facebook.com/profile.php?id=100069004863199"
            className=" flex justify-center items-center rounded-full  text-4xl  hover:scale-110 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <linearGradient
                id="Ld6sqrtcxMyckEl6xeDdMa"
                x1="9.993"
                x2="40.615"
                y1="9.993"
                y2="40.615"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#2aa4f4" />
                <stop offset="1" stop-color="#007ad9" />
              </linearGradient>
              <path
                fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
                d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
              />
              <path
                fill="#fff"
                d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
              />
            </svg>
            {/* <FaFacebook className="text-[#1877F2] scale-105" /> */}
          </Link>
          <Link
            target="_blank"
            to="https://www.instagram.com/startcodingclub/"
            className="flex justify-center items-center rounded-full text-4xl hover:scale-110 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <radialGradient
                id="yOrnnhliCrdS2gy~4tD8ma"
                cx="19.38"
                cy="42.035"
                r="44.899"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#fd5" />
                <stop offset=".328" stop-color="#ff543f" />
                <stop offset=".348" stop-color="#fc5245" />
                <stop offset=".504" stop-color="#e64771" />
                <stop offset=".643" stop-color="#d53e91" />
                <stop offset=".761" stop-color="#cc39a4" />
                <stop offset=".841" stop-color="#c837ab" />
              </radialGradient>
              <path
                fill="url(#yOrnnhliCrdS2gy~4tD8ma)"
                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
              />
              <radialGradient
                id="yOrnnhliCrdS2gy~4tD8mb"
                cx="11.786"
                cy="5.54"
                r="29.813"
                gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#4168c9" />
                <stop offset=".999" stop-color="#4168c9" stop-opacity="0" />
              </radialGradient>
              <path
                fill="url(#yOrnnhliCrdS2gy~4tD8mb)"
                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
              />
              <path
                fill="#fff"
                d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
              />
              <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
              <path
                fill="#fff"
                d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
              />
            </svg>
          </Link>
          <Link
            target="_blank"
            to="https://www.linkedin.com/company/start-coding-club/"
            className="flex justify-center items-center text-[2.1rem] hover:scale-110 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#0288D1"
                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
              />
              <path
                fill="#FFF"
                d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
              />
            </svg>
          </Link>
          <Link
            target="_blank"
            to="mailto:startcodingclub2024@gmail.com"
            className="h-[50px] w-[50px] flex justify-center items-center rounded-full bg-therd text-[2.1rem] hover:scale-110 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <linearGradient
                id="6769YB8EDCGhMGPdL9zwWa"
                x1="15.072"
                x2="24.111"
                y1="13.624"
                y2="24.129"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#e3e3e3" />
                <stop offset="1" stop-color="#e2e2e2" />
              </linearGradient>
              <path
                fill="url(#6769YB8EDCGhMGPdL9zwWa)"
                d="M42.485,40H5.515C4.126,40,3,38.874,3,37.485V10.515C3,9.126,4.126,8,5.515,8h36.969	C43.874,8,45,9.126,45,10.515v26.969C45,38.874,43.874,40,42.485,40z"
              />
              <linearGradient
                id="6769YB8EDCGhMGPdL9zwWb"
                x1="26.453"
                x2="36.17"
                y1="25.441"
                y2="37.643"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#f5f5f5" />
                <stop offset=".03" stop-color="#eee" />
                <stop offset="1" stop-color="#eee" />
              </linearGradient>
              <path
                fill="url(#6769YB8EDCGhMGPdL9zwWb)"
                d="M42.485,40H8l37-29v26.485C45,38.874,43.874,40,42.485,40z"
              />
              <linearGradient
                id="6769YB8EDCGhMGPdL9zwWc"
                x1="3"
                x2="45"
                y1="24"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#d74a39" />
                <stop offset="1" stop-color="#c73d28" />
              </linearGradient>
              <path
                fill="url(#6769YB8EDCGhMGPdL9zwWc)"
                d="M5.515,8H8v32H5.515C4.126,40,3,38.874,3,37.485V10.515C3,9.126,4.126,8,5.515,8z M42.485,8	H40v32h2.485C43.874,40,45,38.874,45,37.485V10.515C45,9.126,43.874,8,42.485,8z"
              />
              <linearGradient
                id="6769YB8EDCGhMGPdL9zwWd"
                x1="24"
                x2="24"
                y1="8"
                y2="38.181"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-opacity=".15" />
                <stop offset="1" stop-opacity=".03" />
              </linearGradient>
              <path
                fill="url(#6769YB8EDCGhMGPdL9zwWd)"
                d="M42.485,40H30.515L3,11.485v-0.969C3,9.126,4.126,8,5.515,8h36.969	C43.874,8,45,9.126,45,10.515v26.969C45,38.874,43.874,40,42.485,40z"
              />
              <linearGradient
                id="6769YB8EDCGhMGPdL9zwWe"
                x1="3"
                x2="45"
                y1="17.73"
                y2="17.73"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#f5f5f5" />
                <stop offset="1" stop-color="#f5f5f5" />
              </linearGradient>
              <path
                fill="url(#6769YB8EDCGhMGPdL9zwWe)"
                d="M43.822,13.101L24,27.459L4.178,13.101C3.438,12.565,3,11.707,3,10.793v-0.278	C3,9.126,4.126,8,5.515,8h36.969C43.874,8,45,9.126,45,10.515v0.278C45,11.707,44.562,12.565,43.822,13.101z"
              />
              <linearGradient
                id="6769YB8EDCGhMGPdL9zwWf"
                x1="24"
                x2="24"
                y1="8.446"
                y2="27.811"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#e05141" />
                <stop offset="1" stop-color="#de4735" />
              </linearGradient>
              <path
                fill="url(#6769YB8EDCGhMGPdL9zwWf)"
                d="M42.485,8h-0.3L24,21.172L5.815,8h-0.3C4.126,8,3,9.126,3,10.515v0.278	c0,0.914,0.438,1.772,1.178,2.308L24,27.459l19.822-14.358C44.562,12.565,45,11.707,45,10.793v-0.278C45,9.126,43.874,8,42.485,8z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <fieldset className="border-t border-secondary w-2/4 mx-auto mb-3 text-center mt-10 ">
        <legend className="text-xs font-light md:text-lg md:font-medium text-nowrap font-inter text-center ">
          {" "}
          © 2025 Start Coding Club. All rights reserved
        </legend>
      </fieldset>
    </div>
  );
}

export default Fotter;
