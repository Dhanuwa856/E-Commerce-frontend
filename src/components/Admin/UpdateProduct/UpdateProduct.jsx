import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import uploadMedia from "../../Utils/mediaUpload";
import { useLocation } from "react-router-dom";

const UpdateProduct = () => {
  const location = useLocation();

  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);
  const [offer, setOffer] = useState(location.state.offer_percentage);
  const [existingImages, setExistingImages] = useState(
    location.state.images || []
  );
  const [imageFiles, setImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL}/products/${
    location.state.product_id
  }`;
  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "stock":
        setStock(value);
        break;
      case "offer_percentage":
        setOffer(value);
        break;
      default:
        break;
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Product name is required!");
      return;
    }
    if (!price || price <= 0) {
      toast.error("Price must be greater than 0!");
      return;
    }

    setIsLoading(true);

    try {
      const newImageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const url = await uploadMedia(file);
          return url;
        })
      );

      const updatedImages = [...existingImages, ...newImageUrls];

      const updatedProduct = {
        name,
        description,
        price,
        stock,
        offer_percentage: offer,
        images: updatedImages,
        isAvailable,
      };

      await axios.put(API_URL, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Update Product
      </h2>
      <form
        className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Other Input Fields */}
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
            placeholder="Enter product name (e.g., Hydrating Serum)"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            required
            maxLength={1000}
            placeholder="Write a brief description of the product"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          ></textarea>
          <small className="text-gray-500">
            {description.length}/1000 characters
          </small>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            required
            placeholder="Enter product price (e.g., 25.99)"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={handleChange}
            required
            placeholder="Enter stock quantity"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          />
        </div>

        {/* Offer Percentage */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Offer Percentage
          </label>
          <input
            type="number"
            name="offer_percentage"
            value={offer}
            onChange={handleChange}
            placeholder="Enter discount percentage (optional)"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          />
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Availability
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">
              {isAvailable ? "Available" : "Not Available"}
            </span>
          </label>
        </div>

        {/* Existing Images */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Existing Images
          </label>
          <div className="grid grid-cols-4 gap-4">
            {existingImages.map((url, index) => (
              <div
                key={index}
                className="relative border rounded-md overflow-hidden shadow-sm"
              >
                <img
                  src={url}
                  alt={`Existing ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
                <button
                  onClick={() => handleRemoveExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Images */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            New Images
          </label>
          <div className="border border-dashed border-gray-400 rounded-lg p-4 relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center text-center text-gray-500">
              <svg
                className="w-10 h-10 mb-2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.75V19.25M8.75 12H15.25M21 8.25C21 7.01 20.24 6.01 19.06 5.68M14.94 5.68A6.001 6.001 0 003.94 11.25H3.94M14.94 5.68L19.06 5.68M14.94 5.68L19.06 5.68"
                />
              </svg>
              <p className="text-sm">
                Click to upload or drag and drop images here
              </p>
              <p className="text-xs text-gray-400">
                Supported formats: JPEG, PNG, GIF
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {newImagePreviews.map((url, index) => (
              <div
                key={index}
                className="relative border rounded-md overflow-hidden shadow-sm"
              >
                <img
                  src={url}
                  alt={`New ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
                <button
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-medium py-2 rounded-lg transition`}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
