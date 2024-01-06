import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Secret from "./pages/Secret";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Secret />} />
      </Routes>
    </BrowserRouter>
  );
}
