import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NavSideBar from "./components/NavSideBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CandidateList from "./components/CandidateList.jsx";
import VoterList from "./components/VoterList.jsx";
import Position from "./components/Position.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavSideBar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CandidateList" element={<CandidateList />} />
        <Route path="/VoterList" element={<VoterList />} />
        <Route path="/Position" element={<Position />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
