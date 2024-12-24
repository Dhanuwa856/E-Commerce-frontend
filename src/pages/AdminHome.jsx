import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import AdminLink from "../components/AdminLink/AdminLink";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../components/Admin/Dashbord/Dashbord";
import AdminProduct from "../components/Admin/Product/AdminProduct";
import { toast } from "react-hot-toast";
import decodeToken from "../components/DecodeToken/DecodeToken";
import AddProduct from "../components/Admin/AddProduct/AddProduct";
import UpdateProduct from "../components/Admin/UpdateProduct/UpdateProduct";
import AdminUsers from "../components/Admin/Users/AdminUsers";
import ChangePriceOffer from "../components/Admin/ChangePriceOffer/ChangePriceOffer";
import CategoryOfferAndPriceAdjustment from "../components/Admin/ChangePriceOffer/ChangePriceOffer";

function AdminHome() {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  const token = localStorage.getItem("authToken");
  const userData = decodeToken(token);
  const navigate = useNavigate();

  if (!token) {
    window.location.href = "/login"; // Redirect to login page
  }

  if (userData.type !== "admin") {
    window.location.href = "/";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
    toast.success("Logged out successfully!");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#0A97B0] w-1/5 pt-8 h-full flex flex-col items-center sticky top-0">
        <img
          src="https://placehold.co/150x50/FFCFEF/FFFFFF/png"
          alt="logo"
          className="w-[150px] h-[50px] mb-6 cursor-pointer"
        />

        <div className="flex flex-col items-center mb-6">
          <img
            src={userData.image}
            alt="admin"
            className="rounded-full w-[60px] h-[60px] border-2 border-white shadow-md"
          />
          <h1 className="text-white capitalize font-medium text-lg mt-3">
            {userData.userName}
          </h1>
        </div>

        <nav className="w-full px-4">
          <ul className="space-y-4 text-white font-medium">
            <AdminLink
              admin_link_name="Dashboard"
              Icon={FiHome}
              link_url={"/admin/"}
            />
            <AdminLink admin_link_name="Orders" Icon={FiShoppingCart} />
            <AdminLink
              admin_link_name="Products"
              Icon={FiBox}
              link_url={"/admin/product"}
            />
            <AdminLink
              admin_link_name="Users"
              Icon={FiUsers}
              link_url={"/admin/users"}
            />
            <AdminLink admin_link_name="Reports" Icon={FiBarChart2} />
            <AdminLink admin_link_name="Settings" Icon={FiSettings} />
          </ul>
        </nav>

        <button
          className="w-4/5 mt-5 mb-6 flex items-center justify-center space-x-3 bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
          onClick={handleLogout}
        >
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <header className="fixed top-4 right-4 z-50">
          <button className="relative p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition">
            <FaBell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              2
            </span>
          </button>
        </header>

        <div className="text-gray-800">
          {showWelcomeMessage && (
            <div className="bg-blue-100 text-blue-800 p-4 rounded shadow-md fixed w-[50%] z-50">
              <h1 className="text-2xl font-bold">Welcome to the Admin Panel</h1>
              <p className="mt-2">Manage your e-commerce operations here.</p>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<AdminProduct />} />
            <Route path="/product/add-product" element={<AddProduct />} />
            <Route path="/product/update-product" element={<UpdateProduct />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route
              path="/product/change-price-offers"
              element={<CategoryOfferAndPriceAdjustment />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
