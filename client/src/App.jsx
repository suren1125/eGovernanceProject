import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CandidateList from "./components/CandidateList.jsx";
import VoterList from "./components/VoterList.jsx";
import Position from "./components/Position.jsx";
import NavSideBar from "./components/NavSideBar.jsx";

function App() {
  const location = useLocation();

  // Paths where the sidebar should not be shown
  const noSidebarPaths = ["/", "/Login", "/Register"];

  return (
    <>
      <div>
        {!noSidebarPaths.includes(location.pathname) && <NavSideBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CandidateList" element={<CandidateList />} />
          <Route path="/VoterList" element={<VoterList />} />
          <Route path="/Position" element={<Position />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
