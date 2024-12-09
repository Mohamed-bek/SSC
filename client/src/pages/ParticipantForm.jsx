import axios from "axios";
import React, { useState } from "react";
import Stars from "../components/Stars";

const ParticipantForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: null,
    phoneNumber: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData to send file
    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber || '');
    formDataToSend.append('description', formData.description || '');
    
    // Append image file
    if (formData.image) {
      formDataToSend.append('file', formData.image);
    }

    try {
      const {data} = await axios.post(process.env.REACT_APP_API_URL + 'participant' , formDataToSend);

      setSubmitStatus({
        show: true,
        success: true,
        message: "Participant registered successfully!"
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        image: null,
        phoneNumber: "",
        description: "",
      });
      setImagePreview(null);

      

      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: "" });
      }, 3000);

    } catch (error) {
      console.log(error);
      setSubmitStatus({
        show: true,
        success: false,
        message: error.message || "Failed to register participant"
      });

      // Hide popup after 3 seconds
      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: "" });
      }, 3000);
    }
  };

  return (
    <div className="w-full px-5 pt-[80px] min-h-dvh bg-gradient-to-b flex justify-center items-center from-black via-black/90 via-[70%] to-purple-900/40 to-[100%] relative">
      <Stars/>
      {/* Status Popup */}
      {submitStatus.show && (
        <div 
          className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 
            ${submitStatus.success 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'}
          `}
        >
          {submitStatus.message}
        </div>
      )}

<div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">
              Participant Registration
            </h2>
            <p className="text-white/70 mt-2">Fill in your details</p>
          </div>
         
          <div>
          <div className="flex justify-center gap-2 items-start mb-5">
             {/* Image Upload */}
          <div className="flex w-[100px] md:w-1/2 flex-col items-center">
            <label htmlFor="image" className="cursor-pointer group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-dashed border-white/30 flex items-center justify-center group-hover:border-purple-500 transition-all">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-white/50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6.75v10.5a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                )}
              </div>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
            />
            <span className="mt-2 text-white/70 text-sm">
              Profile Picture (Optional)
            </span>
          </div>

          {/* Name Inputs */}
          <div className="flex-1">
            <div className="w-full mb-3">
              <label
                htmlFor="firstName"
                className="block text-sm text-white/80 mb-2"
              >
                First Name
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full pl-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="lastName"
                className="block text-sm text-white/80 mb-2"
              >
                Last Name
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full pl-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
          </div>
          </div>
          <div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-white/80 mb-2">
              Email
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                className="w-full pl-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm text-white/80 mb-2"
            >
              Phone Number (Optional)
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.648 3.02c-.125-.5-.575-.852-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder=" 05 50 56 12 80"
                className="w-full pl-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm text-white/80 mb-2"
            >
              Description (Optional)
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute left-3 top-3 text-white/50 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12m-3.75-3h3.75m-3.75 3h3.75m0 0V5.625m0 0h3.75m0 0A3.375 3.375 0 0115.75 9v1.5m-3.375 0h3.375M9 12l3-3m0 0l3 3m-3-3v7.5"
                />
              </svg>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us a bit about yourself..."
                className="w-full pl-10 py-2 min-h-[100px] bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          </div>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 ease-in-out"
          >
            Register Participant
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParticipantForm;