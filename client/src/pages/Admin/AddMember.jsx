import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import InputFieldCustom from "../../components/InputFieldCustom";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";

const AddMember = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = useAxios();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    work: "",
    description: "",
    linkedinUrl: "",
    portfolioUrl: "",
    githubUrl: "",
    department: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const getDepartements = async (req, res) => {
    try {
      const { data } = await API.get(
        `${process.env?.REACT_APP_API_URL}department`
      );
      setDepartments(data.departments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDepartements();
  }, []);
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

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.image) {
      formDataToSend.append("file", formData.image);
    }

    try {
      setLoading(true);
      await API.post(process.env.REACT_APP_API_URL + "member/", formDataToSend);
      toast.success("Profile created successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        work: "",
        description: "",
        linkedinUrl: "",
        portfolioUrl: "",
        githubUrl: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      const message =
        error?.response?.data?.error || "Profile creation failed!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-therd p-3 rounded-lg">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex w-fit gap-2 items-center bg-secondary text-lg text-therd px-3 py-2 rounded-lg"
        >
          <FaArrowLeft className="text-xl" />
          <span>Go Back</span>
        </button>
      </div>
      {loading && <Loader />}
      <ToastContainer theme="dark" />
      <div className={`w-full bg-therd text-secondary rounded-lg  py-8`}>
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold uppercase mb-3">New Memeber</h2>
            <p className="text-xl font-light"> Please Fill All The Fields </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Image Upload */}
            <div className="flex-1">
              {/* {Info } */}
              <div className="w-full flex flex-row gap-5 items-start mb-1.5">
                <label htmlFor="image" className="cursor-pointer group">
                  <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-dashed border-white/40 flex items-center justify-center group-hover:border-secondary transition-all">
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
                        className="w-16 h-16 text-white/50 group-hover:text-secondary duration-150"
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

                {/* Name Section */}
                <div className="flex-1 gap-4 mb-5">
                  <div className="flex-1 mb-4">
                    <InputFieldCustom
                      label="First Name"
                      placeholder="Enter your first name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      setValue={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <InputFieldCustom
                      label="Last Name"
                      placeholder="Enter your last name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      setValue={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Email Phone Section */}
              <div className="flex flex-col md:flex-row gap-4 mb-3">
                <div className="flex-1">
                  <InputFieldCustom
                    type="email"
                    name="email"
                    value={formData.email}
                    setValue={handleInputChange}
                    required
                    label="Email"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="flex-1">
                  <InputFieldCustom
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    setValue={handleInputChange}
                    required
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Work Section */}
              <div>
                <InputFieldCustom
                  name="work"
                  value={formData.work}
                  setValue={handleInputChange}
                  required
                  label="Work/Specialete"
                  placeholder="What do you Work!"
                />
              </div>

              {/* {Department Section} */}
              <div className="mt-3">
                <label className="block text-sm text-secondary mb-2">
                  Department
                </label>
                <select
                  className="w-full px-4 py-2 border border-white/10 bg-grayColor rounded-lg text-therd focus:outline-none"
                  placeholder="Select Department"
                  value={formData.department}
                  name="department"
                  onChange={handleInputChange}
                >
                  <option value=""> Chose One</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {" "}
                      {department.name}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="md:w-3/4 flex flex-col flex-1 gap-6">
              {/* Contact Section */}

              {/* Links Section */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <InputFieldCustom
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      setValue={handleInputChange}
                      label="LinkedIn URL"
                      placeholder="Enter LinkedIn Url!"
                    />
                  </div>
                  <div className="flex-1">
                    <InputFieldCustom
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      setValue={handleInputChange}
                      label="GitHub URL"
                      placeholder="Enter GitHub Url!"
                    />
                  </div>
                </div>
                <div>
                  <InputFieldCustom
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    setValue={handleInputChange}
                    label="Portfolio URL"
                    placeholder="Enter Portfolio Url!"
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="flex-1 flex-col flex">
                <label className="block text-sm text-secondary mb-2 ">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full flex-1 bg-grayColor px-4 py-2 border rounded-lg placeholder:text-black/50 text-therd focus:outline-none "
                  placeholder="Tell us about your experience and skills..."
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-5 w-fit mx-auto">
            <button
              // onClick={() => setVisible(false)}
              type="reset"
              className="w-[180px] text-center block mx-auto py-2 text-lg rounded-lg bg-[#53abea] hover:bg-[#3f8dc5] duration-100 text-white font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-[180px] text-center block mx-auto py-2 text-lg rounded-lg bg-[#59b259] hover:bg-[#458d45] duration-100 text-white font-bold"
              onClick={(e) => handleSubmit(e)}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
