import React, { useState } from "react";

const ProductQuantity = ({ stock }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);

    // Ensure the typed value is a valid number within the allowed range
    if (!isNaN(value)) {
      if (value >= 0 && value <= stock) {
        setQuantity(value);
      } else if (value < 0) {
        setQuantity(0);
      } else {
        setQuantity(stock);
      }
    } else {
      setQuantity(0); // Default to 0 if invalid input
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Decrease Button */}
      <button
        onClick={decreaseQuantity}
        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-lg font-bold bg-[#0A97B0] text-white transition-transform duration-300 hover:scale-110 ${
          quantity === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={quantity === 0}
      >
        -
      </button>

      {/* Quantity Input */}
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        className="w-14 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A97B0] transition duration-300"
        min="0"
        max={stock}
      />

      {/* Increase Button */}
      <button
        onClick={increaseQuantity}
        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-lg font-bold bg-[#0A97B0] text-white transition-transform duration-300 hover:scale-110 ${
          quantity === stock ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={quantity === stock}
      >
        +
      </button>
    </div>
  );
};

export default ProductQuantity;
