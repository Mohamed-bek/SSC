import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import HeaderHome from "./components/HeaderHome";
import Home from "./pages/Home";
import ParticipantForm from "./pages/ParticipantForm";
import Members from "./pages/Members";
import AddMember from "./pages/Admin/AddMember";
import Login from "./pages/Admin/Login";
import ParticipantsList from "./pages/Admin/ParticipantsList";

function App() {
  return (
    <div className="min-h-dvh bg-black bg-gradient-to-b from-black via-black to-purple-900/10 relative overflow-hidden">
      <HeaderHome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participe" element={<ParticipantForm />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/login" element={<Login />} />
        <Route path="/participants" element={<ParticipantsList />} />
      </Routes>
    </div>
  );
}

export default App;
