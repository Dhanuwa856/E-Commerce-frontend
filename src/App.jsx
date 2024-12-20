import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/AdminHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </>
  );
}

export default App;
