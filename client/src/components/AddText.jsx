import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import InputFieldCustom from "./InputFieldCustom";

function AddText({ setListOfText, listOfText = [], label, placeholder }) {
  const [textInput, setTextInput] = useState("");
  const handleAddText = () => {
    if (textInput.trim() !== "") {
      setListOfText((prev) => [...prev, textInput]);
      setTextInput("");
    }
  };

  const handleRemoveText = (index) => {
    setListOfText((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm text-secondary mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <InputFieldCustom
          type="text"
          value={textInput}
          setValue={(e) => setTextInput(e.target.value)}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={handleAddText}
          className="px-5 py-2.5 text-white rounded-md bg-blue-500 focus:outline-none"
        >
          Add
        </button>
      </div>
      {listOfText.length > 0 && (
        <ul className="mt-2 list-disc pl-5 max-h-[120px] overflow-y-auto">
          {listOfText.map((text, index) => (
            <li
              key={index}
              className="flex items-center justify-between mb-0.5"
            >
              <p> ✅ {text}</p>
              <button
                type="button"
                onClick={() => handleRemoveText(index)}
                className="text-red-500 hover:underline text-xl"
              >
                <BiTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddText;
