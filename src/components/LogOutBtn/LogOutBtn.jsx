import React from "react";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-hot-toast";

const LogOutBtn = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
    >
      <FiLogOut className="mr-2" />
      Log Out
    </button>
  );
};

export default LogOutBtn;
