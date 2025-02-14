import React, { useState } from "react";
import { useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import InputFieldCustom from "./InputFieldCustom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function EventRegistration({ event, setVisible, setLoading }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const ImageRef = useRef();
  const CloseRef = useRef();
  const FormRef = useRef();
  const RegistrationRef = useRef();
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(`${process.env.REACT_APP_API_URL}registration`, {
        email,
        firstName,
        lastName,
        event: event._id,
      });
      setLoading(false);
      toast.success("Registration Succeded");
      setTimeout(() => handelCancel(), 3000);
    } catch (error) {
      if (error?.response?.data?.error?.split(" ")[0] === "E11000")
        toast.error("You Already Register");
    } finally {
      setLoading(false);
    }
  };
  const handelCancel = () => {
    ImageRef.current.classList.add("translate-x-1/2");
    FormRef.current.classList.add("-translate-x-1/2");
    CloseRef.current.classList.add("hidden");
    setTimeout(() => {
      RegistrationRef.current.classList.add("scale-0");
      setTimeout(() => setVisible(false), 320);
    }, 300);
  };
  return (
    <div className=" fixed z-40 h-dvh w-dvw bg-black/60 flex justify-center items-center top-0 left-0 ">
      <ToastContainer theme="dark" />
      <div
        ref={RegistrationRef}
        className="flex max-w-5xl items-stretch justify-center rounded-lg relative duration-300"
      >
        <button
          onClick={handelCancel}
          ref={CloseRef}
          className=" absolute top-0 right-0 text-secondary text-3xl hover:text-red-400 duration-100 p-1.5 rounded-full cursor-pointer"
        >
          <FaXmark />
        </button>
        <div
          ref={ImageRef}
          className="w-1/2 rounded-lg overflow-hidden duration-300 z-10"
        >
          <img className="w-full h-full object-cover" src={event?.image} />
        </div>
        <div ref={FormRef} className="w-1/2 px-10 py-10 bg-therd duration-300">
          <h2 className="text-3xl mb-3 font-bold text-center">
            {" "}
            Welcome To {event?.title}
          </h2>
          <p className="text-center text-lg font-light mb-5">
            {" "}
            Please Fill All The Fields{" "}
          </p>
          <form className="max-w-[380px] mx-auto" onSubmit={handelSubmit}>
            <InputFieldCustom
              type="text"
              name="firstName"
              value={firstName}
              setValue={(e) => setFirstName(e.target.value)}
              placeholder="Enter Your First Name"
              label="First Name"
              styles={"mb-3"}
            />
            <InputFieldCustom
              type="text"
              name="lastName"
              value={lastName}
              setValue={(e) => setLastName(e.target.value)}
              placeholder="Enter Your Last Name"
              label="Last Name"
              styles={"mb-3"}
            />
            <InputFieldCustom
              type="email"
              name="email"
              value={email}
              setValue={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              label="Email"
              styles={"mb-8"}
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handelCancel}
                className="px-7 py-1.5 font-bold  flex-1 text-center text-lg bg-blue-500 text-white block mx-auto rounded-lg"
              >
                {" "}
                Cancel{" "}
              </button>
              <button
                type="submit"
                className="px-7 py-1.5 font-bold flex-1 w-full text-center text-lg bg-green-500 text-white block mx-auto rounded-lg"
              >
                {" "}
                Register{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventRegistration;
