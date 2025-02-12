import React, { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { FaImage, FaTrash } from "react-icons/fa";
import InputFieldCustom from "../../components/InputFieldCustom";
import MemberMultiSelect from "../../components/MemberMultiSelect";
import Loader from "../../components/Loader";
import AddText from "../../components/AddText";
import { Link, useNavigate } from "react-router-dom";

function AddDepartment() {
  const [loading, setLoading] = useState(false);
  const API = useAxios();
  const navigate = useNavigate();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [selectedCoLeader, setSelectedCoLeader] = useState(null);
  const [responsibilities, setResponsibilities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    departmentImage: null,
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

  const handleDepartmentImageChange = (e) => {
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
        departmentImage: file,
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
      departmentImage: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLeader) {
      toast.error("Please select a department leader");
      return;
    }
    console.log(selectedLeader);
    console.log(selectedCoLeader);
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("leader", selectedLeader);
    formDataToSend.append("responsibilities", JSON.stringify(responsibilities));
    if (selectedCoLeader) {
      formDataToSend.append("co_leader", selectedCoLeader);
    }

    if (formData.departmentImage) {
      formDataToSend.append("file", formData.departmentImage);
    }

    try {
      await API.post(
        process.env.REACT_APP_API_URL + "department",
        formDataToSend
      );
      setFormData({
        name: "",
        description: "",
        departmentImage: null,
      });

      setSelectedLeader(null);
      setSelectedCoLeader(null);
      setImagePreview(null);
      setResponsibilities([]);
      toast.success("Department created successfully!");
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.error || "Department creation failed!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-therd rounded-lg p-2 flex flex-col">
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
      <div
        className={`w-full text-secondary rounded-2xl shadow-xl p-8 flex-1 $`}
      >
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold uppercase mb-3">
              New Department
            </h2>
            <p className="text-xl font-light">Please Fill All The Fields</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="w-full flex flex-row gap-5 items-stretch mb-1.5">
                <div>
                  <div
                    onClick={handleImageClick}
                    className="relative cursor-pointer group py-2"
                  >
                    <div className="md:h-[330px] w-[500px] h-full rounded-lg border-4 border-dashed border-white/40 flex items-center justify-center group-hover:border-secondary transition-all overflow-hidden">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Department Preview"
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
                  <div className="mt-4 flex ">
                    <div className="mb-2">
                      <label className="block text-sm text-secondary mb-2 pl-2.5">
                        Department Leader
                      </label>

                      <MemberMultiSelect
                        selectedMembers={selectedLeader ? [selectedLeader] : []}
                        setSelectedMembers={(members) =>
                          setSelectedLeader(members[0])
                        }
                        maxSelection={1}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm text-secondary mb-2 pl-2.5">
                        Co-Leader (Optional)
                      </label>
                      <MemberMultiSelect
                        selectedMembers={
                          selectedCoLeader ? [selectedCoLeader] : []
                        }
                        setSelectedMembers={(members) =>
                          setSelectedCoLeader(members[0])
                        }
                        maxSelection={1}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <div className="">
                    <InputFieldCustom
                      label="Department Name"
                      placeholder="Enter Department Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      setValue={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <label className="block text-sm text-secondary mb-2 ">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full bg-grayColor px-4 py-2 flex-1 border rounded-lg placeholder:text-black/50 text-therd focus:outline-none"
                      placeholder="Enter Department description..."
                      required
                    />
                  </div>
                  <AddText
                    placeholder="Enter a responsibilitie"
                    label="Responsibilities"
                    listOfText={responsibilities}
                    setListOfText={setResponsibilities}
                  />
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleDepartmentImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-5 w-fit mx-auto">
            <button
              //   onClick={() => setVisible(false)}
              type="reset"
              className="w-[180px] text-center block mx-auto py-2 text-lg rounded-lg bg-blue-500 hover:bg-blue-600 duration-100 text-white font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[180px] text-center block mx-auto py-2 text-lg rounded-lg bg-green-600 hover:bg-green-700 duration-100 text-white font-bold"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDepartment;
