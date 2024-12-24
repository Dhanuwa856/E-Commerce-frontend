import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const CategoryOfferAndPriceAdjustment = () => {
  const [categoryName, setCategoryName] = useState("Makeup"); // Default category
  const [offerPercentage, setOfferPercentage] = useState(0);
  const [adjustmentPercentage, setAdjustmentPercentage] = useState(0);
  const [message, setMessage] = useState("");

  const APIURL = `${import.meta.env.VITE_API_URL}/category/`;
  const token = localStorage.getItem("authToken");

  const handleOfferChange = async () => {
    try {
      const response = await axios.patch(
        `${APIURL}${categoryName}`,
        {
          offer_percentage: offerPercentage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      toast.success("Offer percentage updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      toast.error("Failed to update offer percentage.");
    }
  };

  const handlePriceAdjustment = async () => {
    try {
      const response = await axios.post(
        `${APIURL}${categoryName}`,
        {
          adjustmentPercentage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      toast.success("Prices adjusted successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      toast.error("Failed to adjust prices.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900 text-center">
        Update Category Offers & Prices
      </h1>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Select Category
          </label>
          <select
            id="category"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          >
            <option value="Makeup">💄 Makeup</option>
            <option value="SkinCare">🌿 Skin Care</option>
            <option value="HairCare">💇 Hair Care</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="offer"
            className="block text-sm font-medium text-gray-700"
          >
            Offer Percentage
          </label>
          <input
            id="offer"
            type="number"
            min="0"
            max="100"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={offerPercentage}
            onChange={(e) => setOfferPercentage(e.target.value)}
            placeholder="Enter offer percentage"
          />
          <button
            onClick={handleOfferChange}
            className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Offer Percentage
          </button>
        </div>

        <div>
          <label
            htmlFor="priceAdjustment"
            className="block text-sm font-medium text-gray-700"
          >
            Price Adjustment Percentage
          </label>
          <input
            id="priceAdjustment"
            type="number"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={adjustmentPercentage}
            onChange={(e) => setAdjustmentPercentage(e.target.value)}
            placeholder="Enter price adjustment percentage"
          />
          <button
            onClick={() => {
              Swal.fire({
                title: "Confirm Adjustment",
                text: "Are you sure you want to adjust the prices?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, adjust it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  handlePriceAdjustment();
                }
              });
            }}
            className="w-full mt-4 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Adjust Prices
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryOfferAndPriceAdjustment;
