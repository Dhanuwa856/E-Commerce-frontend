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
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Admin/Dashbord/Dashbord";

function AdminHome() {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 5000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#0A97B0] w-1/5 pt-8 h-fit flex flex-col items-center">
        {/* Logo */}
        <img
          src="https://placehold.co/150x50/FFCFEF/FFFFFF/png"
          alt="logo"
          className="w-[150px] h-[50px] mb-6 cursor-pointer"
        />

        {/* Admin Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://placehold.co/60"
            alt="admin"
            className="rounded-full w-[60px] h-[60px] border-2 border-white shadow-md"
          />
          <h1 className="text-white capitalize font-medium text-lg mt-3">
            Admin Name
          </h1>
        </div>

        {/* Navigation */}
        <nav className="w-full px-4">
          <ul className="space-y-4 text-white font-medium">
            <AdminLink admin_link_name="Dashboard" Icon={FiHome} />
            <AdminLink admin_link_name="Products" Icon={FiBox} />
            <AdminLink admin_link_name="Orders" Icon={FiShoppingCart} />
            <AdminLink admin_link_name="Users" Icon={FiUsers} />
            <AdminLink admin_link_name="Reports" Icon={FiBarChart2} />
            <AdminLink admin_link_name="Settings" Icon={FiSettings} />
          </ul>
        </nav>

        {/* Logout Button */}
        <button className="w-4/5 mt-5 mb-6 flex items-center justify-center space-x-3 bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-red-700 transition">
          <FiLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {/* Header */}
        <header className="fixed top-4 right-4 z-50">
          <button className="relative p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition">
            <FaBell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              2
            </span>
          </button>
        </header>

        {/* Content */}
        <div className="text-gray-800">
          {showWelcomeMessage && (
            <div className="bg-blue-100 text-blue-800 p-4 rounded shadow-md fixed w-[50%]">
              <h1 className="text-2xl font-bold">Welcome to the Admin Panel</h1>
              <p className="mt-2">Manage your e-commerce operations here.</p>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
