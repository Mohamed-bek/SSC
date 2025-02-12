import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import HeaderHome from "./components/HeaderHome";
import Home from "./pages/Home";
import ParticipantForm from "./pages/ParticipantForm";
import Members from "./pages/Members";
import Login from "./pages/Admin/Login";
import ParticipantsList from "./pages/Admin/Participants";
import Stars from "./components/Stars";
import "react-toastify/dist/ReactToastify.css";
import Events from "./pages/Events";
import EventDetail from "./pages/Event";
import Projects from "./pages/Projects";
import Departements from "./pages/Departements";
import Dashboard from "./pages/Admin/Dashboard";
import { useAdminContext } from "./context/Admin";
import Statistics from "./pages/Admin/Statistics";
import AddEvent from "./pages/Admin/AddEvent";
import ClubMembers from "./pages/Admin/ClubMembers";
import DepartementManager from "./pages/Admin/DepartementManager";
import AddDepartment from "./pages/Admin/AddDepartment";
import AdminDepartment from "./pages/Admin/AdminDepartment";
import EventManager from "./pages/Admin/EventManager";
import AdminMember from "./pages/Admin/AdminMember";
import AddMember from "./pages/Admin/AddMember";
import ProjectManager from "./pages/Admin/ProjectManager";
import AdminProject from "./pages/Admin/AdminProject";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { admin } = useAuth();
  useEffect(() => {
    if (admin) {
      navigate("/dashboard");
    }
  }, [admin]);
  return (
    <div className="min-h-dvh relative overflow-hidden">
      {/* <Stars /> */}
      <div className="fixed bottom-0 left-0 w-dvw h-dvh BackPurple z-[-10]"></div>
      <div className="w-full h-full relative z-10">
        {!admin && <HeaderHome />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join-us" element={<ParticipantForm />} />
          <Route path="/members" element={<Members />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/departements" element={<Departements />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Statistics />} />
            <Route path="partcipants" element={<ParticipantsList />} />
            <Route path="manage-members" element={<AdminMember />}>
              <Route path="" element={<ClubMembers />} />
              <Route path="add-member" element={<AddMember />} />
            </Route>
            <Route path="manage-departments" element={<AdminDepartment />}>
              <Route path="" element={<DepartementManager />} />
              <Route path="add-department" element={<AddDepartment />} />
            </Route>
            <Route path="manage-events" element={<AdminDepartment />}>
              <Route path="" element={<EventManager />} />
              <Route path="add-event" element={<AddEvent />} />
            </Route>
            <Route path="manage-projects" element={<AdminProject />}>
              <Route path="" element={<ProjectManager />} />
              <Route path="add-event" element={<AddEvent />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
