import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes,Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import ProtectRoute from "./routes/ProtectRoute";
import ChatPage from "./pages/ChatPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";



function App() {
  

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/register" element = {<Register/>}></Route>
      <Route path="/home" element={<ProtectRoute><Home/></ProtectRoute>}></Route>
      <Route path="/room/:roomId" element={<ProtectRoute><ChatPage/></ProtectRoute>}></Route>
      
    </Routes>
    <ToastContainer autoClose = {3000} hideProgressBar/></>
    
  );
}

export default App;

