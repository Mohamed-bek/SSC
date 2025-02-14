import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { FaArrowLeft, FaImage, FaTrash } from "react-icons/fa";
import InputFieldCustom from "../../components/InputFieldCustom";
import { techIcons } from "../../components/TechsIcons";
import MultiSelectForm from "../../components/MultiSelectForm";
import MemberMultiSelect from "../../components/MemberMultiSelect";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const API = useAxios();
  const options = Object.keys(techIcons);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    description: "",
    projectImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("Image size should be less than 10MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        projectImage: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      projectImage: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("link", formData.link);
    formDataToSend.append("members", JSON.stringify(selectedMembers));
    formDataToSend.append("techs", JSON.stringify(selectedTechs));

    if (formData.projectImage) {
      formDataToSend.append("file", formData.projectImage);
    }

    try {
      await API.post(process.env.REACT_APP_API_URL + "project", formDataToSend);
      setFormData({
        title: "",
        link: "",
        description: "",
        projectImage: null,
      });
      setSelectedMembers([]);
      setSelectedTechs([]);
      setImagePreview(null);
      toast.success("Project created successfully!");
    } catch (error) {
      const message =
        error?.response?.data?.error || "Project creation failed!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={` rounded-lg w-full p-3 px-6 h-full bg-therd `}>
      <div className="mb-5">
        <button
          onClick={() => navigate(-1)}
          className="flex w-fit gap-2 items-center bg-secondary text-lg text-therd px-3 py-2 rounded-lg"
        >
          <FaArrowLeft className="text-xl" />
          <span>Go Back</span>
        </button>
      </div>{" "}
      {loading && <Loader />}
      <ToastContainer theme="dark" />
      <div className={`w-full bg-therd text-secondary rounded-2xl shadow-xl  `}>
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold uppercase mb-3">New Project</h2>
            <p className="text-xl font-light">Please Fill All The Fields</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Image Upload and Basic Info */}
            <div className="flex-1">
              <div className="w-full flex flex-row gap-5 items-stretch mb-1.5">
                <div
                  onClick={handleImageClick}
                  className="relative cursor-pointer group py-2"
                >
                  <div className="w-[500px] h-full rounded-lg border-4 border-dashed border-white/40 flex items-center justify-center group-hover:border-secondary transition-all overflow-hidden">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Project Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <FaTrash className="text-white" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FaImage className="w-16 h-16 text-white/50 group-hover:text-secondary duration-150" />
                        <p className="text-white/50 mt-2">
                          Click to upload image
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 gap-4">
                  <div className="flex-1 mb-1">
                    <InputFieldCustom
                      label="Project title"
                      placeholder="Enter Project Title"
                      type="text"
                      name="title"
                      value={formData.tit}
                      setValue={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <InputFieldCustom
                      label="Link"
                      placeholder="Enter Project Link"
                      type="url"
                      name="link"
                      value={formData.link}
                      setValue={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-secondary mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full bg-grayColor px-4 py-2 min-h-[128px] border rounded-lg placeholder:text-black/50 text-therd focus:outline-none"
                      placeholder="Enter Project description..."
                      required
                    />
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProjectImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Right Column - Speakers */}
          </div>
          <MultiSelectForm
            selectedOptions={selectedTechs}
            setSelectedOptions={setSelectedTechs}
          />
          <MemberMultiSelect
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />
          <div className="mt-5 flex items-center gap-5 w-fit mx-auto">
            <button
              // onClick={() => setVisible(false)}
              type="reset"
              className="w-[180px] text-center block mx-auto py-2 text-lg rounded-lg bg-[#53abea] hover:bg-[#3f8dc5] duration-100 text-white font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[180px] text-center block mx-auto py-2 text-lg rounded-lg bg-[#59b259] hover:bg-[#458d45] duration-100 text-white font-bold"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
