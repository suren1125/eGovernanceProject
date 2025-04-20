import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Home from "./Pages/Home.jsx";
import { AuthUserContext} from "./Context/AuthUserContext.jsx"
import ElectionPage from "./Pages/ElectionPage.jsx";
import { useContext } from "react";
function App() {
  const {user} = useContext(AuthUserContext);
  console.log(user)
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={!user?<Login />:<Home />} />
        <Route path="/register" element={!user?<Register />:<Home />} />
        <Route index path="/home" element={<Home />} />
        <Route path="/" element={<Home/>} />
        <Route path="/election/:id" element={<ElectionPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
