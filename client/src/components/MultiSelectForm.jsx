import React, { useRef } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { techIcons } from "./TechsIcons";

const MultiSelectForm = ({ selectedOptions = [], setSelectedOptions }) => {
  const options = Object.keys(techIcons);
  const modalRef = useRef();

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    if (selectedOptions.includes(option)) {
      setSelectedOptions((prev) => prev.filter((op) => op !== option));
    } else {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  const handleRemoveOption = (e, option) => {
    e.preventDefault();
    setSelectedOptions((prev) => prev.filter((op) => op !== option));
  };

  return (
    <div className="w-full">
      <div className="mb-0">
        <div className="flex flex-wrap gap-2 p-2 bg-grayColor/20 rounded-lg">
          {selectedOptions.map((option) => (
            <div
              key={option}
              className="flex items-center gap-2 bg-white p-2 py-3 rounded-lg shadow-sm"
            >
              <span className="text-sm font-medium text-therd capitalize">
                {option}
              </span>
              <button
                onClick={(e) => handleRemoveOption(e, option)}
                className="p-1 hover:bg-red-100 rounded-full transition-colors"
              >
                <FaTimes className="text-red-500 text-sm" />
              </button>
            </div>
          ))}
          <button
            onClick={(e) => {
              e.preventDefault();
              modalRef.current.classList.remove("scale-0");
            }}
            className="flex items-center gap-2 text-center text-lg bg-grayColor text-therd px-3 py-2.5 rounded-lg"
          >
            <FaPlus className="text-sm" />
            {selectedOptions.length > 0 ? "Add More" : "Select Technologies"}
          </button>
        </div>
      </div>

      <div
        ref={modalRef}
        className="w-full duration-150 scale-0 h-full bg-black/50 z-10 flex justify-center items-center rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10"
      >
        <div className="bg-therd rounded-lg p-10 w-full max-w-2xl">
          <h3 className="text-center text-xl font-semibold mb-2">
            Select Technologies
          </h3>
          <p className="text-sm font-light mb-2 text-center mb-5">
            Click technologies to select or unselect
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[50vh] overflow-y-auto p-2">
            {options.map((option) => {
              const IconComponent = techIcons[option];
              return (
                <div
                  key={option}
                  onClick={(e) => handleOptionClick(e, option)}
                  className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOptions.includes(option)
                      ? "bg-green-500 font-semibold text-white"
                      : "bg-grayColor text-therd"
                  }`}
                >
                  <div className="text-3xl mb-2">
                    {IconComponent && <IconComponent />}
                  </div>
                  <span className="text-sm font-medium text-center">
                    {option}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-5 w-fit mx-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                modalRef.current.classList.add("scale-0");
              }}
              className="w-[180px] text-center block mx-auto py-2 text-lg rounded-lg bg-[#53abea] hover:bg-[#3f8dc5] duration-100 text-white font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectForm;
