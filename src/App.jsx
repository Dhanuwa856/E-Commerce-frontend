import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

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
