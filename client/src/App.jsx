import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import NavSideBar from "./components/NavSideBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CandidateList from "./components/CandidateList.jsx";

const CANDIDATE_DATA = [
  {
    id: "c-0",
    firstName: "Ranjit",
    lastName: "Shrestha",
    position: "President",
  },
  {
    id: "c-1",
    firstName: "Salman",
    lastName: "Prajapati",
    position: "Vice President",
  },
  {
    id: "c-2",
    firstName: "Surja",
    lastName: "Shrestha",
    position: "Vice President",
  },
];

function App() {
  return (
    <BrowserRouter>
      <NavSideBar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route
          path="/CandidateList"
          element={<CandidateList candidates={CANDIDATE_DATA} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
