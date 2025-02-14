import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { FaArrowLeft, FaImage, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import InputFieldCustom from "../../components/InputFieldCustom";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const EventUpdate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const API = useAxios();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    image: null,
  });

  const [speakers, setSpeakers] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const speakerImageRefs = useRef([]);

  const getEvent = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}event/${id}`
      );
      const { title, location, date, description, image, speakers } =
        data.event;
      setFormData({
        title,
        location,
        startDate: new Date(date?.start).toISOString().split("T")[0],
        endDate: new Date(date?.end).toISOString().split("T")[0],
        description,
        image,
      });
      setSpeakers(speakers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainImageChange = (e) => {
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

  const handleSpeakerImageDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSpeakerImageDrop = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const updatedSpeakers = [...speakers];
        updatedSpeakers[index] = {
          ...updatedSpeakers[index],
          image: {
            file,
            preview: event.target.result,
          },
        };
        setSpeakers(updatedSpeakers);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSpeakerImageChange = (e, index) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const updatedSpeakers = [...speakers];
        updatedSpeakers[index] = {
          ...updatedSpeakers[index],
          image: {
            file,
            preview: event.target.result,
          },
        };
        setSpeakers(updatedSpeakers);
      };

      reader.readAsDataURL(file);
    }
  };

  const addSpeaker = () => {
    setSpeakers([
      ...speakers,
      {
        firstName: "",
        lastName: "",
        image: null,
        isNew: true,
      },
    ]);
  };

  const removeSpeaker = (index) => {
    const updatedSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(updatedSpeakers);
  };

  const updateSpeaker = (index, field, value) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index][field] = value;
    setSpeakers(updatedSpeakers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("description", formData.description);

    if (formData.image) {
      formDataToSend.append("file", formData.image);
    }

    const speakersWithNewImages = speakers.map((speaker) => ({
      firstName: speaker.firstName,
      lastName: speaker.lastName,
      _id: speaker._id,
      isNew: speaker.isNew,
      image: speaker.image && !speaker.image.file ? speaker.image : null,
    }));

    formDataToSend.append("speakers", JSON.stringify(speakersWithNewImages));

    speakers.forEach((speaker) => {
      if (speaker.image && speaker.image.file) {
        formDataToSend.append("speakerImages", speaker.image.file);
      }
    });

    try {
      setLoading(true);
      await API.put(
        `${process.env.REACT_APP_API_URL}event/${id}`,
        formDataToSend
      );
      toast.success("Event updated successfully!");
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.error || "Event update failed!";
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
      <div className={`w-full text-secondary rounded-2xl p-8 duration-1000 `}>
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold uppercase mb-3">Update Event</h2>
            <p className="text-base font-light">Please Fill All The Fields</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Image Upload and Basic Info */}
            <div className="flex-[2]">
              <div className="w-full flex flex-row gap-5 md:items-stretch mb-1.5">
                <div className="relative max-h-[330px]  flex-[1.5]  flex items-center justify-center">
                  <img
                    src={imagePreview || formData.image}
                    alt="Event Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <label
                    htmlFor="image"
                    className="h-10 w-10 flex justify-center items-center absolute -bottom-2 -right-2 rounded-full bg-blue-50 p-1 text-blue-500 text-xl cursor-pointer"
                  >
                    <FaPen />
                  </label>
                </div>

                <div className="flex-1 gap-4">
                  <div className="flex-1 mb-4">
                    <InputFieldCustom
                      label="Event Title"
                      placeholder="Enter Event Title"
                      type="text"
                      name="title"
                      value={formData.title}
                      setValue={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <InputFieldCustom
                      label="Location"
                      placeholder="Enter Event location"
                      type="text"
                      name="location"
                      value={formData.location}
                      setValue={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex-1 mb-4">
                      <InputFieldCustom
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        setValue={handleInputChange}
                        required
                        label="Start Date"
                      />
                    </div>
                    <div className="flex-1">
                      <InputFieldCustom
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        setValue={handleInputChange}
                        required
                        label="End Date"
                      />
                    </div>
                  </div>
                </div>

                <input
                  type="file"
                  id="image"
                  ref={imageInputRef}
                  onChange={handleMainImageChange}
                  accept="image/*"
                  className="hidden"
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
                  className="w-full bg-grayColor px-4 py-2 min-h-[100px] max-h-[150px] border rounded-lg placeholder:text-black/50 text-therd focus:outline-none"
                  placeholder="Enter Event description..."
                  required
                />
              </div>
            </div>

            {/* Right Column - Speakers */}
            <div className="md:w-3/4 flex flex-col flex-1 gap-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Speakers</h2>
                <button
                  type="button"
                  onClick={addSpeaker}
                  className="flex items-center bg-[#53abea] hover:bg-[#3f8dc5] text-white px-3 py-2 rounded-lg"
                >
                  <FaPlus className="w-5 h-5 mr-2" /> Add Speaker
                </button>
              </div>

              <div className="max-h-[330px] overflow-y-auto">
                {speakers.map((speaker, index) => (
                  <div key={index} className="py-2 rounded-lg relative">
                    {speakers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpeaker(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    )}

                    <div className="flex items-center  gap-4">
                      <div className="">
                        <div
                          onDragOver={(e) =>
                            handleSpeakerImageDragOver(e, index)
                          }
                          onDrop={(e) => handleSpeakerImageDrop(e, index)}
                          onClick={() =>
                            speakerImageRefs.current[index].click()
                          }
                          className="border-2 border-dashed rounded-lg p-2 text-center cursor-pointer transition-colors duration-300 h-[150px] w-[150px] border-white/40 hover:border-secondary"
                        >
                          <input
                            type="file"
                            ref={(el) => (speakerImageRefs.current[index] = el)}
                            onChange={(e) => handleSpeakerImageChange(e, index)}
                            accept="image/*"
                            className="hidden"
                          />
                          {speaker.image ? (
                            <div className="relative h-full">
                              <img
                                src={speaker.image.preview || speaker.image}
                                alt="Speaker"
                                className="h-full w-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updatedSpeakers = [...speakers];
                                  updatedSpeakers[index].image = null;
                                  setSpeakers(updatedSpeakers);
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                              >
                                <FaTrash className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                              <FaPlus className="w-8 h-8 text-white/50 group-hover:text-secondary mb-1" />
                              <p className="text-xs text-white/50">Add Image</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div>
                          <InputFieldCustom
                            label="First Name"
                            placeholder="Enter speaker's first name"
                            type="text"
                            styles="mb-3"
                            value={speaker.firstName}
                            setValue={(e) =>
                              updateSpeaker(index, "firstName", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <InputFieldCustom
                            label="Last Name"
                            placeholder="Enter speaker's last name"
                            type="text"
                            value={speaker.lastName}
                            setValue={(e) =>
                              updateSpeaker(index, "lastName", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

export default EventUpdate;
