import React, { useState } from "react";
import { FaBuilding, FaImage, FaMailBulk, FaPhone, FaUser } from "react-icons/fa";
import Stars from "../../components/Stars";

const AddMember = () => {
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "Human Resources",
    "Finance",
    "Customer Support",
    "Product Management",
    "Design",
    "Operations",
    "IT",
  ];

  const [memberData, setMemberData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "", // Will be selected from dropdown
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMemberData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (
      !memberData.firstName ||
      !memberData.lastName ||
      !memberData.email ||
      !memberData.department
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Submitting member data:", memberData);

    // Optional: Reset form after submission
    setMemberData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      department: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <div className="w-full px-5 pt-[80px] min-h-dvh bg-gradient-to-b flex justify-center items-center from-black via-black/90 via-[70%] to-purple-900/40 to-[100%] relative">
    <Stars/>
    <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border ring-white/20 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-400">Add New Member</h2>
      <form className="text-white" onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="mb-4 flex justify-center">
          <label className="cursor-pointer flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-transparent flex items-center justify-center border-4 border-dashed border-white/20">
                <FaImage size={48} className="text-white/20" />
              </div>
            )}
            <span className="text-sm text-gray-600 mt-2">
              Upload Profile Picture
            </span>
          </label>
        </div>

        {/* Name Inputs */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1 relative">
            <FaUser
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              name="firstName"
              value={memberData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full bg-[#262626] pl-10 pr-3 py-2 border rounded-md focus:outline-none  focus:ring-primary"
              required
            />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              name="lastName"
              value={memberData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full pl-3 pr-3 py-2 bg-[#262626] border rounded-md focus:outline-none  focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4 relative">
          <FaMailBulk
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="email"
            name="email"
            value={memberData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="w-full bg-[#262626] pl-10 pr-3 py-2 border rounded-md focus:outline-none  focus:ring-primary"
            required
          />
        </div>

        {/* Phone Number Input */}
        <div className="mb-4 relative">
          <FaPhone
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="tel"
            name="phoneNumber"
            value={memberData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full bg-[#262626] pl-10 pr-3 py-2 border rounded-md focus:outline-none  focus:ring-primary"
          />
        </div>

        {/* Department Select */}
        <div className="mb-4 relative">
          <FaBuilding
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <select
            name="department"
            value={memberData.department}
            onChange={handleInputChange}
            className="w-full bg-[#262626] pl-10 pr-3 py-2 border rounded-md focus:outline-none  focus:ring-primary"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary transition duration-300"
        >
          Add Member
        </button>
      </form>
    </div>
  </div>

  );
};

export default AddMember;
