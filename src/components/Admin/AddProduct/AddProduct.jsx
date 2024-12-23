import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import uploadMedia from "../../Utils/mediaUpload";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Makeup",
    stock: "",
    images: [],
    brand: "",
    offer_percentage: 0,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL}/products/`;
  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name.trim()) {
      toast.error("Product name is required!");
      return;
    }
    if (!product.price || product.price <= 0) {
      toast.error("Price must be greater than 0!");
      return;
    }

    setIsLoading(true);

    try {
      // Upload images to Firebase and get their URLs
      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const url = await uploadMedia(file);
          return url;
        })
      );
      const newProduct = { ...product, images: imageUrls };

      const response = await axios.post(API_URL, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Product added successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "Makeup",
          stock: "",
          images: [],
          brand: "",
          offer_percentage: 0,
        });
        setImageFiles([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Product
      </h2>
      <form
        className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
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
            value={product.description}
            onChange={handleChange}
            required
            maxLength={1000}
            placeholder="Write a brief description of the product"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          ></textarea>
          <small className="text-gray-500">
            {product.description.length}/1000 characters
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
            value={product.price}
            onChange={handleChange}
            required
            placeholder="Enter product price (e.g., 25.99)"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          >
            <option value="Makeup">💄 Makeup</option>
            <option value="SkinCare">🌿 Skin Care</option>
            <option value="HairCare">💇 Hair Care</option>
          </select>
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            placeholder="Enter stock quantity"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          />
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Enter product brand (optional)"
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
            value={product.offer_percentage}
            onChange={handleChange}
            placeholder="Enter discount percentage (optional)"
            className="w-full border rounded-lg px-3 py-2 text-gray-700"
          />
        </div>

        {/* Images */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Images</label>
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
            {imageFiles.map((file, index) => (
              <div
                key={index}
                className="relative border rounded-md overflow-hidden shadow-sm"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-24 object-cover"
                />
                <button
                  onClick={() => {
                    setImageFiles((prev) => prev.filter((_, i) => i !== index));
                  }}
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
          {isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
