import React, { useState } from "react";
import { useEffect } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeletePopup from "../../components/DeletePopup";
import useAxios from "../../hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";

function DepartementManager() {
  const API = useAxios();
  const [departements, setDepartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const getDepartements = async () => {
    try {
      const { data } = await API.get(
        `${process.env?.REACT_APP_API_URL}department`
      );
      setDepartements(data.departments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setPopup(false);
    setDepartmentToDelete(null);
  };

  const deleteDepartment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.delete(
        `${process.env?.REACT_APP_API_URL}department/${departmentToDelete._id}`
      );
      setDepartements((prev) =>
        prev.filter((departement) => departement._id !== departmentToDelete._id)
      );
      toast.success(
        `${departmentToDelete.name} Department  deleted successfully`
      );
      cancelDelete();
    } catch (error) {
      toast.error(`Failed To Delete ${departmentToDelete.name} Department`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDepartements();
  }, []);
  return (
    <div className="w-full h-full rounded-lg flex flex-col gap-3 relative">
      {loading && <Loader />}

      <div>
        <ToastContainer theme="dark" />
        <div className="flex justify-between items-center px-4 py-3 rounded-lg  bg-therd">
          <h1 className="text-2xl text-secondary font-medium">
            {" "}
            Departements{" "}
          </h1>
          <Link
            to="add-department"
            className="flex bg-secondary items-center gap-2 text-lg font-semibold rounded-xl px-4 py-2 text-therd"
          >
            {" "}
            <FaPlus /> <span>Add Departement </span>
          </Link>
        </div>
      </div>
      {popup && (
        <DeletePopup
          deleteFunc={deleteDepartment}
          cancel={() => cancelDelete()}
          text="Delete Department"
          subText={`Are You Sure You want to Delete this Department`}
        />
      )}
      <div className="flex-1 bg-therd rounded-lg overflow-hidden">
        <header className="flex items-center text-secondary justify-between p-4 bg-therd border-b border-grayColor">
          <div className="flex-1 min-w-[300px]">Name</div>
          <div className="w-[300px] text-start pl-5">Leader</div>
          <div className="w-[300px] text-start pl-5">Co-Leader</div>
          <div className="w-[180px] text-center">Members</div>
          <div className="w-[120px] text-center">Manage</div>
        </header>
        <div className=" overflow-y-auto flex-1">
          {departements.map((departement) => (
            <div
              key={departement._id}
              className="flex items-center justify-between p-4 py-2 border-b font-normal text-[1.1rem] border-secondary hover:bg-black/30"
            >
              <div className="flex-1 min-w-[300px] flex items-center gap-2">
                <img
                  className="w-14 h-14 rounded-full cursor-pointer"
                  src={departement?.image?.secure_url || "/default-avatar.jpg"}
                  // onClick={() => setSelectedUser(member)}
                />
                {departement?.name}
              </div>
              <div className="flex-1 min-w-[300px] flex items-center gap-2">
                <img
                  className="w-14 h-14 rounded-full cursor-pointer"
                  src={departement?.leader?.image || "/default-avatar.jpg"}
                  // onClick={() => setSelectedUser(member)}
                />
                {departement?.leader?.firstName +
                  " " +
                  departement?.leader?.lastname}
              </div>
              <div className="flex-1 min-w-[300px] flex items-center gap-2">
                <img
                  className="w-14 h-14 rounded-full cursor-pointer"
                  src={departement?.co_leader?.image || "/default-avatar.jpg"}
                  // onClick={() => setSelectedUser(member)}
                />
                {departement?.co_leader?.firstName +
                  " " +
                  departement?.co_leader?.lastname}
              </div>
              <div className="w-[180px] text-center">{departement.members}</div>
              <div className="w-[120px] text-center flex items-center justify-center gap-2">
                <Link
                  to={`update-department/${departement._id}`}
                  title="update"
                  className="text-blue-600 ml-2"
                >
                  <FaPen />
                </Link>
                <button
                  title="delete"
                  onClick={() => {
                    setDepartmentToDelete(departement);
                    setPopup(true);
                  }}
                  className="text-red-500 ml-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DepartementManager;
