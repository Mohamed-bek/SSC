import React from "react";
import { BsTrash3 } from "react-icons/bs";

function DeletePopup({ text, subText, cancel, deleteFunc, underText }) {
  return (
    <div className="fixed duration-300 top-0 left-0 w-dvw h-dvh flex items-center justify-center bg-black/40 z-50 scale-100">
      <form className="px-8 pt-5 py-8 bg-therd rounded-xl">
        <div className="w-fit p-2 text-4xl bg-red-100 mx-auto mb-5 text-red-500 rounded-full">
          <BsTrash3 />
        </div>
        <h1 className="text-center text-4xl font-medium mb-2"> {text} </h1>
        <p className="text-center text-sm mb-7 font-light">
          {" "}
          {subText} <br />{" "}
          {!underText && (
            <span className="font-medium">This Action cannot be undone </span>
          )}
        </p>
        <div className="flex justify-center gap-2 items-center px-4 mx-auto text-lg">
          <button
            onClick={cancel}
            className="bg-blue-500 px-5 text-whiteColor flex-1 py-2 cursor-pointer font-semibold block rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={deleteFunc}
            className="bg-red-500 px-5 text-whiteColor flex-1 py-2 cursor-pointer font-semibold block rounded-md"
          >
            {underText || "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeletePopup;
