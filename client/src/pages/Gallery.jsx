import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { CiZoomIn } from "react-icons/ci";
import Loader from "../components/Loader";

const Gallery = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [conference, setConference] = useState(null);

  useEffect(() => {
    fetchConference();
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "gallery/" + id
      );
      console.log(data);
      setImages(data.galleries);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConference = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "event/" + id
      );
      setConference(data.event);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageClass = (index) => {
    const pattern = index % 8;
    if (pattern === 0 || pattern === 7) {
      return "col-span-2 row-span-2";
    } else if (pattern === 3 || pattern === 4) {
      return "col-span-2";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-therd text-secondary py-5">
      {loading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="PageHeader">{conference?.title} Gallery</h1>
          <p className="text-xl text-grayColor max-w-2xl -mt-3 mx-auto">
            Explore our collection of memorable moments captured during the
            conference of{" "}
            <span className="font-semibold">{conference?.title}</span>
          </p>
        </div>
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-auto grid-flow-dense gap-1.5 md:gap-2">
          {images?.length > 0 &&
            images.map((image, index) => (
              <div
                key={image._id}
                className={`group relative cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 ${getImageClass(
                  index
                )}`}
                onClick={() => setSelectedImage(image)}
              >
                <div className="w-full h-full">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                  <img
                    src={image.image}
                    alt={image.description}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-[1.3rem] font-semibold line-clamp-2 mb-2 text-shadow-lg">
                        {image.description}
                      </p>
                      <div className="flex items-center gap-2 text-lg text-grayColor ">
                        <CiZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                        <p className="">Click to view</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-[#00000034] z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 max-h-[80dvh] translate-y-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black overflow-hidden md:h-[400px] lg:h-[600px]">
                <img
                  src={selectedImage.image}
                  alt={"Gallery"}
                  className="w-full"
                />
              </div>
              <button
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-colors duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <FaXmark className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
