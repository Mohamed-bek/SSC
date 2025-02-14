import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MemberMultiSelect from "../../components/MemberMultiSelect";
import InputFieldCustom from "../../components/InputFieldCustom";
import { FaArrowLeft, FaPen, FaSave } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";
import MultiSelectForm from "../../components/MultiSelectForm";

const ProjectUpdate = () => {
  const API = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const inputFileRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: { public_id: "", secure_url: "" },
  });

  const [members, setMembers] = useState([]);
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}project/${id}`
        );
        console.log("Data  : ", data);
        const { title, description, image, link } = data.project;
        setFormData({ title, description, image, link });
        setMembers(data.project.members.map((member) => member._id));
        setTechs(data.project.techs);
        setLoading(false);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("link", formData.link);
    formDataToSend.append("techs", JSON.stringify(techs));
    console.log("members : ", members);
    formDataToSend.append("members", JSON.stringify(members));
    if (preview) {
      formDataToSend.append("file", formData.image);
    }
    try {
      await API.put(
        process.env.REACT_APP_API_URL + "project/" + id,
        formDataToSend
      );
      toast.success("Project Updated successfully!");
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.error || "Failed To Update Proejct!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
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
        image: file,
      }));
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="h-full w-full bg-therd rounded-lg mx-auto p-3 flex flex-col">
      {loading && <Loader />}
      <ToastContainer theme="dark" />
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex w-fit gap-2 items-center bg-secondary text-lg text-therd px-3 py-2 rounded-lg mb-5"
        >
          <FaArrowLeft className="text-xl" />
          <span>Go Back</span>
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-5">
        Update {formData.title} Project
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 pb-10">
        {/* Name Field */}
        <div className="flex-1">
          <div className="flex items-start w-full gap-10">
            <div className="flex-1 relative">
              <label className="block text-sm font-medium mb-1">
                Project Image
              </label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded hidden"
                ref={inputFileRef}
              />
              <img
                src={preview || formData.image.secure_url}
                alt="Department preview"
                className="mt-2 max-h-[350px] w-full object-cover rounded "
              />
              <span
                onClick={() => inputFileRef.current.click()}
                className="h-10 w-10 flex justify-center items-center absolute top-5 -right-2 rounded-full bg-blue-50 p-1 text-blue-500 text-xl cursor-pointer"
              >
                <FaPen />
              </span>
              <div className="mt-5">
                <MultiSelectForm
                  setSelectedOptions={setTechs}
                  selectedOptions={techs}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                <InputFieldCustom
                  type="text"
                  name="title"
                  value={formData.title}
                  setValue={handleChange}
                  required
                  label="Project Title"
                />
              </div>

              <div className="mb-4">
                <InputFieldCustom
                  type="url"
                  name="link"
                  value={formData.link}
                  setValue={handleChange}
                  required
                  label="Project link"
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg h-32 focus:outline-none text-therd px-4"
                  required
                />
              </div>
              <div className="flex items-center gap-5 -ml-2">
                <div>
                  <label className="block text-sm font-medium mb-1 pl-3">
                    Leader
                  </label>
                  <MemberMultiSelect
                    selectedMembers={members}
                    setSelectedMembers={setMembers}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 duration-150 text-white  px-7 py-2.5 flex justify-center items-center rounded-lg font-semibold text-lg mx-auto w-fit gap-2"
        >
          <FaSave /> Update Project
        </button>
      </form>
    </div>
  );
};

export default ProjectUpdate;
