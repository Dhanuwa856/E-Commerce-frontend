import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import Auth from "./components/Login/Login";
import HomePage from "./pages/HomePage";
import ProductPage from "./components/ProductPage/ProductPage";
import NavBar from "./components/NavBar/NavBar";
import AllProducts from "./components/AllProducts/AllProducts";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/makeup" element={<ProductPage categoryName="Makeup" />} />
        <Route
          path="/skincare"
          element={<ProductPage categoryName="SkinCare" />}
        />
        <Route
          path="/haircare"
          element={<ProductPage categoryName="HairCare" />}
        />
        <Route path="/all-products" element={<AllProducts />} />
      </Routes>
    </>
  );
}

export default App;
