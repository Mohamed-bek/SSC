// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FiSave, FiTrash2, FiPlus } from "react-icons/fi";
// import AddText from "../../components/AddText";
// import MemberMultiSelect from "../../components/MemberMultiSelect";
// import InputFieldCustom from "../../components/InputFieldCustom";

// const DepartmentUpdate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // State management
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     image: { public_id: "", secure_url: "" },
//     leader: "",
//     co_leader: "",
//   });
//   const [responsibilities, setResponsibilities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(
//           `${process.env.REACT_APP_API_URL}department/${id}`
//         );
//         console.log(data);
//         const { name, description, image, leader, co_leader } = data.department;
//         console.log("Infoo : ", name, description, image, leader, co_leader);
//         setFormData({ name, description, image, leader, co_leader });
//         setResponsibilities(data.department.responsibilities);
//         setLoading(false);
//       } catch (err) {
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_URL}department/${id}`,
//         formData
//       );
//       navigate("/admin/departments");
//     } catch (err) {}
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle image upload (you'll need to implement your cloudinary upload logic)
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     // Implement your image upload logic here
//     // Update formData.image with the new public_id and secure_url
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="h-full w-full bg-therd rounded-lg mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Update Department</h1>

//       <form onSubmit={handleSubmit} className="">
//         {/* Name Field */}
//         <div className="flex items-start w-full gap-10">
//           <div className="flex-1">
//             <label className="block text-sm font-medium mb-1">
//               Department Image
//             </label>
//             <input
//               type="file"
//               onChange={handleImageUpload}
//               className="w-full p-2 border rounded hidden"
//             />
//             {formData.image.secure_url && (
//               <img
//                 src={formData.image.secure_url}
//                 alt="Department preview"
//                 className="mt-2 max-h-[350px] w-full object-cover rounded "
//               />
//             )}
//           </div>
//           <div className="flex-1">
//             <div className="mb-4">
//               <InputFieldCustom
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 setValue={handleChange}
//                 required
//                 label="Department Name"
//               />
//             </div>

//             {/* Description Field */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded h-32 focus:outline-none text-therd px-4 font-noraml"
//                 required
//               />
//             </div>
//             <div className="flex items-center gap-5">
//               <div>
//                 <label className="block text-sm font-medium mb-1 pl-3">
//                   Leader
//                 </label>
//                 <MemberMultiSelect
//                   selectedMembers={formData.leader ? [formData.leader] : []}
//                   setSelectedMembers={(members) =>
//                     setFormData({ ...formData, leader: members[0] })
//                   }
//                   maxSelection={1}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1 pl-3">
//                   Co-Leader (Optional)
//                 </label>
//                 <MemberMultiSelect
//                   selectedMembers={
//                     formData.co_leader ? [formData.co_leader] : []
//                   }
//                   setSelectedMembers={(members) =>
//                     setFormData({ ...formData, co_leader: members[0] || null })
//                   }
//                   maxSelection={1}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Image Upload */}

//         {/* Leader Selection */}

//         {/* Co-Leader Selection */}
//         {/* <div>
//           <label className="block text-sm font-medium mb-1">
//             Co-Leader (Optional)
//           </label>
//           <select
//             name="co_leader"
//             value={formData.co_leader}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option value="">Select Co-Leader</option>
//             {members.map((member) => (
//               <option key={member._id} value={member._id}>
//                 {member.name}
//               </option>
//             ))}
//           </select>
//         </div> */}

//         {/* Responsibilities */}
//         <AddText
//           setListOfText={setResponsibilities}
//           listOfText={responsibilities}
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <FiSave /> Update Department
//         </button>
//       </form>
//     </div>
//   );
// };

// export default DepartmentUpdate;

import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSave, FiTrash2, FiPlus } from "react-icons/fi";
import AddText from "../../components/AddText";
import MemberMultiSelect from "../../components/MemberMultiSelect";
import InputFieldCustom from "../../components/InputFieldCustom";
import { FaArrowLeft, FaPen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";

const DepartmentUpdate = () => {
  const API = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const inputFileRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: { public_id: "", secure_url: "" },
    leader: "",
    co_leader: "",
  });
  const [responsibilities, setResponsibilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}department/${id}`
        );
        console.log(data);
        const { name, description, image, leader, co_leader } = data.department;
        console.log("Infoo : ", name, description, image, leader, co_leader);
        setFormData({ name, description, image, leader, co_leader });
        setResponsibilities(data.department.responsibilities);
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

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("leader", formData.leader);
    formDataToSend.append("responsibilities", JSON.stringify(responsibilities));
    if (formData.co_leader) {
      formDataToSend.append("co_leader", formData.co_leader);
    }
    if (preview) {
      formDataToSend.append("file", formData.image);
    }
    try {
      await API.put(
        process.env.REACT_APP_API_URL + "department/" + id,
        formDataToSend
      );
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
        Update {formData.name} Department
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 pb-10">
        {/* Name Field */}
        <div className="flex-1">
          <div className="flex items-start w-full gap-10">
            <div className="flex-1 relative">
              <label className="block text-sm font-medium mb-1">
                Department Image
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
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <InputFieldCustom
                  type="text"
                  name="name"
                  value={formData.name}
                  setValue={handleChange}
                  required
                  label="Department Name"
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
              <div className="flex items-center gap-5">
                <div>
                  <label className="block text-sm font-medium mb-1 pl-3">
                    Leader
                  </label>
                  <MemberMultiSelect
                    selectedMembers={formData.leader ? [formData.leader] : []}
                    setSelectedMembers={(members) => {
                      setFormData({ ...formData, leader: members[0] || null });
                    }}
                    maxSelection={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 pl-3">
                    Co-Leader (Optional)
                  </label>
                  <MemberMultiSelect
                    selectedMembers={
                      formData.co_leader ? [formData.co_leader] : []
                    }
                    setSelectedMembers={(members) => {
                      setFormData({
                        ...formData,
                        co_leader: members[0] || null,
                      });
                    }}
                    maxSelection={1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <AddText
            setListOfText={setResponsibilities}
            listOfText={responsibilities}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 duration-150 text-white  px-7 py-2.5 flex justify-center items-center rounded-lg font-semibold text-lg mx-auto w-fit gap-2"
        >
          <FiSave /> Update Department
        </button>
      </form>
    </div>
  );
};

export default DepartmentUpdate;
