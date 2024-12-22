
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";

import Signup from "./components/Signup.jsx";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
