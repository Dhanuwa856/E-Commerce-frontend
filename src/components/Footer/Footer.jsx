import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

function Footer() {
  return (
    <footer className="w-full mt-20 bg-[#2A3335] p-6 md:px-12 md:pt-10">
      <div className="md:flex md:justify-between gap-10 md:items-start">
        {/* Get In Touch Section */}
        <div className="mb-6 md:mb-0 md:w-1/4">
          <h2 className="text-xl capitalize font-semibold text-white mb-4">
            Get In Touch
          </h2>
          <ul className="text-gray-400 text-sm flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <FaLocationDot />
              4031 Winifred Way ,Indiana
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +012 345 67890
            </li>
            <li className="flex items-center gap-2">
              <MdEmail /> support@ecommerce.com
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <span className="w-[35px] h-[35px] border rounded-full flex items-center justify-center border-gray-400 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition">
              <FaFacebookF />
            </span>
            <span className="w-[35px] h-[35px] border rounded-full flex items-center justify-center border-gray-400 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition">
              <FaYoutube />
            </span>
            <span className="w-[35px] h-[35px] border rounded-full flex items-center justify-center border-gray-400 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition">
              <FaLinkedinIn />
            </span>
            <span className="w-[35px] h-[35px] border rounded-full flex items-center justify-center border-gray-400 text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-800 transition">
              <FaXTwitter />
            </span>
          </div>
        </div>

        {/* Shop Section */}
        <div className="mb-6 md:mb-0 md:w-1/4">
          <h2 className="text-xl capitalize font-semibold text-white mb-4">
            Shop
          </h2>
          <ul className="text-gray-400 text-sm capitalize font-semibold flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <IoMdArrowDropright />
              <Link
                to={"/new-arrivals"}
                className="hover:text-white transition"
              >
                New Arrivals
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <IoMdArrowDropright />
              <Link
                to={"/best-sellers"}
                className="hover:text-white transition"
              >
                Best Sellers
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <IoMdArrowDropright />
              <Link to={"/discounts"} className="hover:text-white transition">
                Discounts
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <IoMdArrowDropright />
              <Link to={"/gift-cards"} className="hover:text-white transition">
                Gift Cards
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="mb-6 md:mb-0 md:w-1/4">
          <h2 className="text-xl capitalize font-semibold text-white mb-4">
            Customer Service
          </h2>
          <ul className="text-gray-400 text-sm capitalize font-semibold flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <IoMdArrowDropright />
              <Link to={"/faq"} className="hover:text-white transition">
                FAQs
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <IoMdArrowDropright />
              <Link to={"/shipping"} className="hover:text-white transition">
                Shipping & Returns
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <IoMdArrowDropright />
              <Link to={"/track-order"} className="hover:text-white transition">
                Track Your Order
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <IoMdArrowDropright />
              <Link to={"/contact"} className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="mb-6 md:mb-0 md:w-1/4">
          <h2 className="text-xl capitalize font-semibold text-white mb-4">
            Newsletter
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get updates on new arrivals, special offers, and more.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full rounded-l-md outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#FFCFEF] text-gray-800 font-bold px-4 py-2 rounded-r-md hover:bg-[#FFA4C0]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="w-full mx-auto !bg-gray-400 mt-4 h-[0.5px]" />

      {/* Footer Bottom */}
      <div className="w-full mx-auto flex flex-wrap justify-between text-gray-400 text-sm mt-4 pb-1">
        <p className="text-center md:text-left">
          © 2025 E-commerce, All Rights Reserved. Designed By{" "}
          <a
            href="https://github.com/Dhanuwa856"
            className="hover:underline text-white"
          >
            Dhanushka Rathnayaka
          </a>
          .
        </p>
        <div className="md:flex gap-7 hidden">
          <Link to="/" className="cursor-pointer hover:text-white transition">
            Home
          </Link>
          <Link
            to="/privacy"
            className="cursor-pointer hover:text-white transition"
          >
            Privacy Policy
          </Link>
          <Link
            to="/cookies"
            className="cursor-pointer hover:text-white transition"
          >
            Cookies
          </Link>
          <Link
            to="/help"
            className="cursor-pointer hover:text-white transition"
          >
            Help
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
