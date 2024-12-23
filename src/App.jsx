import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
