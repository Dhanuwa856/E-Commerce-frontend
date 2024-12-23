import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [productIsLoaded, setProductIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = `${import.meta.env.VITE_API_URL}/products/`;

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setProducts(res.data);
        setProductIsLoaded(true);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong.");
        setProductIsLoaded(true);
      });
  });

  const handleDelete = async (product_id) => {
    // Confirm deletion with SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the product permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // Start the deletion process
      try {
        const response = await axios.delete(`${API_URL}${product_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          toast.success("Product deleted successfully!");
        } else {
          toast.error("Failed to delete the product. Please try again.");
        }
      } catch (error) {
        // Handle any errors
        toast.error(
          "An error occurred while deleting the product. Please try again later."
        );
      }
    } else {
      toast.info("Product deletion canceled.");
    }
  };

  if (!productIsLoaded) {
    return <LoadingScreen additional_hint="Preparing your product list...." />;
  }

  return (
    <div className="p-6 bg-gray-100 max-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Admin Product List
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {/* Scrollable Vertical Container */}
        <div className="h-[450px] overflow-y-auto">
          <table className="min-w-full">
            <thead className="bg-blue-500 text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Images
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Available
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Offer (%)
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Final Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="odd:bg-gray-100 even:bg-gray-200 text-gray-700"
                >
                  <td className="px-6 py-4 text-sm">{product.name}</td>
                  <td className="px-6 py-4 text-sm">{product.description}</td>
                  <td className="px-6 py-4 text-sm">${product.price}</td>
                  <td className="px-6 py-4 text-sm">{product.category}</td>
                  <td className="px-6 py-4 text-sm">{product.stock}</td>
                  <td className="px-6 py-4 text-sm grid gap-2">
                    {product.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={img.name}
                        className="w-16 h-16 object-cover"
                      />
                    ))}
                  </td>
                  <td className="px-6 py-4 text-sm">{product.brand}</td>
                  <td className="px-6 py-4 text-sm">
                    {product.isAvailable ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {product.offer_percentage}%
                  </td>
                  <td className="px-6 py-4 text-sm">${product.finalPrice}</td>
                  <td className="px-6 py-4 text-sm flex items-center justify-center gap-2">
                    <Link
                      to={"update-product"}
                      state={product}
                      className="text-[#0A97B0] text-lg hover:text-[#0A5EB0]"
                      title="Edit Icon"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="text-red-600 text-lg hover:text-red-700"
                      title="Delete Icon"
                      onClick={() => {
                        handleDelete(product.product_id);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to={"add-product"}
            className="fixed bottom-6 right-6 bg-[#0A5EB0] hover:bg-[#0A97B0] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
            aria-label="Add Product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.75v14.5m7.25-7.25H4.75"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
