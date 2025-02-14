import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import InputFieldCustom from "../../components/InputFieldCustom";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";

function MemberUpdate() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const API = useAxios();
  const { id } = useParams();
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
  const [preview, setPreview] = useState(null);

  const getDepartements = async () => {
    try {
      const { data } = await API.get(
        `${process.env?.REACT_APP_API_URL}department`
      );
      setDepartments(data.departments);
    } catch (error) {
      console.log(error);
    }
  };

  const getMember = async () => {
    try {
      console.log("The Id : ", id);
      const { data } = await API.get(
        `${process.env?.REACT_APP_API_URL}member/${id}`
      );
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        work,
        department,
        image,
        media,
        description,
      } = data.member;
      setFormData({
        firstName,
        lastName,
        email,
        image,
        phoneNumber,
        work,
        githubUrl: media.github,
        portfolioUrl: media.portfolio,
        linkedinUrl: media.linkedin,
        department,
        description,
      });
    } catch (error) {
      console.log(error);
      toast.error("Member Not Found");
    }
  };

  useEffect(() => {
    getDepartements();
    getMember();
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
        setPreview(reader.result);
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
      await API.put(
        `${process.env.REACT_APP_API_URL}member/${id}`,
        formDataToSend
      );
      toast.success("Profile created successfully!");
    } catch (error) {
      console.log(error);
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
            <h2 className="text-4xl font-bold uppercase mb-3">
              Update Memeber
            </h2>
            <p className="text-xl font-light"> Please Fill All The Fields </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Image Upload */}
            <div className="flex-1">
              {/* {Info } */}
              <div className="w-full flex flex-row gap-5 items-start mb-1.5">
                <div className="cursor-pointer group">
                  <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center group-hover:border-secondary transition-all">
                    <label
                      htmlFor="image"
                      className="h-10 w-10 flex justify-center items-center absolute bottom-3 -right-1 rounded-full bg-blue-50 p-1 text-blue-500 text-xl cursor-pointer"
                    >
                      <FaPen />
                    </label>
                    <img
                      src={preview || formData.image}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

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
}

export default MemberUpdate;
