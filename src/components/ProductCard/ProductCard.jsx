import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AiOutlineShoppingCart, AiOutlinePercentage } from "react-icons/ai";

const ProductCard = ({ product }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        {/* Product Image */}
        <div className="relative">
          <img
            className="w-full h-56 object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrfGix9TOlyl0qhLdkIa3bwDapnDaT7aAR1A&s"
            alt="Product Image"
          />
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            New
          </div>
          {/* Cart Icon */}
          <div className="absolute top-2 right-2">
            <button className="bg-white text-gray-800 p-2 rounded-full shadow hover:bg-gray-100 transition-all duration-300 hidden group-hover:block">
              <AiOutlineShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 truncate line-clamp-2">
            Product Title
          </h3>

          {/* Price Section */}
          <div className="flex items-center mt-4 space-x-3">
            {/* Original Price */}
            <span className="text-[9px] line-through text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              $69.99
            </span>

            {/* Discounted Price */}
            <span className="text-2xl font-bold text-gray-800">$49.99</span>

            {/* Save Percentage */}
            <div className="flex items-center space-x-1 bg-red-100 text-red-600 px-2 py-1 rounded-md">
              <span className="text-xs font-medium">Save 29%</span>
            </div>
          </div>

          {/* Product Description */}
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            A more detailed description of the product that highlights its key
            features and benefits. This ensures the card looks visually balanced
            and informative.
          </p>

          {/* Rating Section */}
          <div className="flex items-center mt-3">
            <AiFillStar className="text-yellow-400 w-5 h-5" />
            <AiFillStar className="text-yellow-400 w-5 h-5" />
            <AiFillStar className="text-yellow-400 w-5 h-5" />
            <AiFillStar className="text-yellow-400 w-5 h-5" />
            <AiOutlineStar className="text-gray-300 w-5 h-5" />
            <span className="ml-2 text-sm text-gray-600">(4.0)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
