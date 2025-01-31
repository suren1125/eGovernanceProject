import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CandidateList from "./components/CandidateList.jsx";
import VoterList from "./components/VoterList.jsx";
import Position from "./components/Position.jsx";
import NavSideBar from "./components/NavSideBar.jsx";
import BallotPosition from "./components/BallotPosition.jsx";
import Header from "./components/Header.jsx";

function App() {
  const location = useLocation();

  // Paths where the sidebar should not be shown
  const noSidebarPaths = ["/", "/login", "/register"];
  const noHeaderPaths = ["/", "/login", "/register"];

  return (
    <>
      <div>
        {!noHeaderPaths.includes(location.pathname) && <Header />}
        {!noSidebarPaths.includes(location.pathname) && <NavSideBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/candidateList" element={<CandidateList />} />
          <Route path="/voterList" element={<VoterList />} />
          <Route path="/position" element={<Position />} />
          <Route path="/ballotPosition" element={<BallotPosition />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
