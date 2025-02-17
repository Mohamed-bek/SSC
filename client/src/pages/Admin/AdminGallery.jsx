import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { RiLoader4Line } from "react-icons/ri";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import DeletePopup from "../../components/DeletePopup";

const AdminGallery = () => {
  const { id } = useParams();
  const API = useAxios();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [popup, setPopup] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const [formData, setFormData] = useState({
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(
        process.env.REACT_APP_API_URL + "gallery/" + id
      );
      setImages(data.galleries);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const imageData = new FormData();
      imageData.append("file", formData.image);
      const { data } = await API.post(
        process.env.REACT_APP_API_URL + "gallery/" + id,
        imageData
      );
      console.log("data :", data);
      setFormData({
        image: null,
        description: "",
      });
      setImages((prv) => [...prv, data?.gallery]);
      setPreviewUrl(null);
      setShowModal(false);
      toast.success("Image Added Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Fail To Add Image");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await API.delete(
        process.env.REACT_APP_API_URL + "gallery/" + imageToDelete
      );
      setImages((prv) => prv._id != imageToDelete);
      setImageToDelete(null);
      cancelDelete();
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Fail To delete Image");
      console.error("Error deleting image:", error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({ image: null });
    setPreviewUrl(null);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setImageToDelete(null);
    setPopup(false);
  };

  const selectImageToDelete = (id) => {
    setImageToDelete(id);
    setPopup(true);
  };

  return (
    <div className="h-full w-full bg-therd text-secondary rounded-lg p-3 relative">
      <ToastContainer theme="dark" />
      {loading && <Loader />}
      {popup && (
        <DeletePopup
          cancel={cancelDelete}
          deleteFunc={handleDelete}
          text="Delete Image"
          subText={`Are you sure you want to delete this image`}
        />
      )}
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            Add Image
          </button>
        </div>

        {/* Add Image Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999999] p-4">
            <div className="bg-therd text-secondary rounded-2xl shadow-xl p-8 max-w-md w-full transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Add New Image</h2>
                <button onClick={resetForm} className="transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Image
                  </label>
                  <label
                    htmlFor="file"
                    className="relative cursor-pointer rounded-md font-medium focus-within:outline-none"
                  >
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-grayColor border-dashed rounded-lg hover:border-secondary transition-colors">
                      <div className="space-y-1 text-center">
                        {previewUrl ? (
                          <div className="mb-4">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="max-h-40 mx-auto rounded-lg"
                            />
                          </div>
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm">
                          <span>Upload a file</span>
                          <input
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                            required
                          />
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-[white] bg-green-600 focus:bg-green-700 rounded-lg  focus:outline-none disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {uploading ? (
                    <>
                      <RiLoader4Line className="w-5 h-5 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaPlus className="w-5 h-5 mr-2" />
                      Add Image
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto flex items-center gap-5 flex-wrap">
          {images.length > 0 &&
            [...images, ...images, ...images, ...images].map((image) => (
              <div
                key={image?._id}
                className="relative h-64 bg-white rounded-xl overflow-hidden shadow-md group"
              >
                <img
                  src={image?.image}
                  alt={"Event Gallery"}
                  className="h-full w-full object-contain"
                />
                <button
                  onClick={() => selectImageToDelete(image._id)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
