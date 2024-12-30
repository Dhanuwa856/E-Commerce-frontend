import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { MdLogin, MdMenu, MdClose } from "react-icons/md";
import NavLink from "../NavLink/NavLink";
import decodeToken from "../DecodeToken/DecodeToken";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("authToken");
  const authToken = localStorage.getItem("authToken");
  const userData = authToken ? decodeToken(authToken) : null;

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-[#2A3335] lg:px-8">
      {/* Logo */}
      <Link className="text-white text-lg font-semibold" to={"/"}>
        <img
          src="/logo_white_text.png"
          alt="website logo"
          className="h-10 cursor-pointer object-contain"
        />
      </Link>

      {/* Navigation Links (Desktop Only) */}
      <ul className="hidden lg:flex space-x-6 text-white font-medium tracking-wide">
        <li>
          <NavLink link_name="shop all" link_url="/all-products" />
        </li>
        <li>
          <NavLink link_name="makeup" link_url="/makeup" />
        </li>
        <li>
          <NavLink link_name="skincare" link_url="/skincare" />
        </li>
        <li>
          <NavLink link_name="haircare" link_url="/haircare" />
        </li>
        <li>
          <NavLink link_name="about" />
        </li>
        <li>
          <NavLink link_name="contact" />
        </li>
      </ul>

      {/* User Image / Login Button */}
      <div className="text-white flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-xl cursor-pointer font-medium hidden lg:flex text-[#FFF] hover:text-[#0A97b0] transition-all duration-300 relative">
              <BsCart4 />
              <span className="absolute text-[10px] -top-3 -right-3 w-[15px] h-[15px] bg-[#fff] text-[#0A97B0] font-semibold flex items-center justify-center rounded-full">
                {1 || 0}
              </span>
            </span>
            <img
              src={userData?.image || "https://placehold.co/50"}
              alt="user profile"
              className="w-[45px] h-[45px] rounded-full cursor-pointer object-cover object-center"
            />
          </>
        ) : (
          <button className="bg-[#0A97B0] text-white px-5 py-2 rounded-full flex items-center shadow-md hover:bg-[#0A5EB0] hover:shadow-lg transition-all duration-300">
            <MdLogin className="text-xl mr-2" />
            <span className="font-medium text-sm uppercase">Login</span>
          </button>
        )}
      </div>

      {/* Menu Icon (Tablet & Mobile) */}
      <div
        className="lg:hidden text-white text-3xl cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <MdClose /> : <MdMenu />}
      </div>

      {/* Side Menu (Tablet & Mobile) */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-[#2A3335] bg-opacity-95 z-50 flex flex-col items-center py-8 px-4 space-y-8 w-[250px]" // Reduced width
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <div
            className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdClose />
          </div>

          {/* Logo at the Top */}
          <div className="text-white text-lg font-semibold">
            <img
              src="/logo_white_text.png"
              alt="website logo"
              className="h-12 cursor-pointer object-contain"
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col space-y-4 text-white font-medium text-lg">
            <li>
              <NavLink link_name="shop all" />
            </li>
            <li>
              <NavLink link_name="makeup" />
            </li>
            <li>
              <NavLink link_name="skincare" />
            </li>
            <li>
              <NavLink link_name="haircare" />
            </li>
            <li>
              <NavLink link_name="about" />
            </li>
            <li>
              <NavLink link_name="contact" />
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;
