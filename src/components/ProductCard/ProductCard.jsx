import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuCrown } from "react-icons/lu";

const ProductCard = (props) => {
  const renderRating = () => {
    if (!props.rating || props.rating <= 0) {
      return <span className="text-sm text-gray-600">Not Rated</span>;
    }

    const fullStars = Math.floor(props.rating);
    const halfStars = props.rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <AiFillStar
            key={`full-${index}`}
            className="text-yellow-400 w-5 h-5"
          />
        ))}
        {halfStars === 1 && (
          <AiOutlineStar className="text-yellow-400 w-5 h-5" />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <AiOutlineStar
            key={`empty-${index}`}
            className="text-gray-300 w-5 h-5"
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({props.rating})</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        {/* Product Image */}
        <div className="relative">
          <img
            className="w-full h-56 object-cover object-center shadow-sm"
            src={props.image}
            alt="Product Image"
          />
          {props.isNew && (
            <div className="absolute top-2 left-2 bg-[#0A97B0] text-white text-xs font-semibold px-3 py-1 rounded-full">
              New
            </div>
          )}
          {props.isTop && (
            <div className="absolute top-2 left-2 bg-[#0A97B0] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-2 gap-2 capitalize">
              <LuCrown /> Best Selling
            </div>
          )}
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
            {props.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-center mt-2 space-x-3">
            {/* Discounted Price */}
            <span className="text-2xl font-bold text-gray-800">
              ${props.finalPrice}
            </span>
            {/* Original Price */}
            {props.discount > 0 && (
              <span className="text-[9px] line-through text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                ${props.price}
              </span>
            )}

            {/* Save Percentage */}
            {props.discount > 0 && (
              <div className="flex items-center space-x-1 bg-red-100 text-red-600 px-2 py-1 rounded-md">
                <span className="text-xs font-medium">
                  Save {props.discount}%
                </span>
              </div>
            )}
          </div>

          {/* Product Description */}
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {props.description}
          </p>

          {/* Rating Section */}
          <div className="mt-3">{renderRating()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
