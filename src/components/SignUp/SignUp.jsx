import React from "react";

const Signup = () => {
  return (
    <div className="flex h-screen bg-[#FFCFEF] items-center justify-center">
      <div className="flex max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-10 rounded-r-lg border border-[#2A3335]">
          <h2 className="text-3xl font-bold text-[#2A3335]">Sign Up</h2>
          <form className="mt-6 w-80">
            <div className="mb-4">
              <label className="block text-[#2A3335]">First Name</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5EB0]"
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#2A3335]">Last Name</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5EB0]"
                placeholder="Enter your last name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#2A3335]">Username</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5EB0]"
                placeholder="Choose a username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#2A3335]">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5EB0]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#2A3335]">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A5EB0]"
                placeholder="Create a password"
              />
            </div>
            <button className="w-full bg-[#0A97B0] text-white p-3 rounded-md hover:bg-[#0A5EB0]">
              Sign Up
            </button>
          </form>
        </div>
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center bg-[#0A97B0] text-white p-10 rounded-l-lg">
          <h1 className="text-4xl font-bold mb-4">Create Your Account</h1>
          <p className="text-lg">
            Simplify your e-commerce management with our user-friendly admin
            dashboard.
          </p>
          <div className="mt-8">
            <img
              src="https://via.placeholder.com/200"
              alt="Characters"
              className="w-3/4"
            />
          </div>
        </div>

        {/* Right Section */}
      </div>
    </div>
  );
};

export default Signup;
