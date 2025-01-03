import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import MoreProducts from "../MoreProducts/MoreProducts";

function ItemPage() {
  const { product_id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(
    productDetails.images && productDetails.images.length > 0
      ? productDetails.images[0]
      : productDetails.images // Default image if no images are provided
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < productDetails.stock) {
      setQuantity(quantity + 1);
    }
  };
  const handleAddToWishlist = () => {
    setIsAddedToWishlist(!isAddedToWishlist);
  };
  const APIURL = `${import.meta.env.VITE_API_URL}/products/${product_id}`;

  useEffect(() => {
    axios
      .get(APIURL)
      .then((res) => {
        setProductDetails(res.data);
        setSelectedImage(res.data.images?.[0]); // Update selected image with the first product image
      })
      .catch((err) => {
        console.log(err);
      });
  }, [APIURL]);

  const handleAddToCart = () => {
    console.log(`${productDetails.name} added to cart`);
  };

  return (
    <>
      {/* Header section */}
      <div className="w-full h-[450px] relative bg-[#FFCFEF]">
        <img
          src="/shop1.jpg"
          alt=""
          className="w-full h-[450px] object-cover object-center rounded-md"
        />
        <div className="bg-[#0A97B0]/40 absolute w-full h-full top-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1
            className="text-6xl font-extrabold tracking-[.9rem]"
            style={{
              textShadow: `
              2px 2px 0px #6b7280, 
              4px 4px 0px #4b5563, 
              6px 6px 0px #1f2937`,
              color: "#FFF",
            }}
          >
            SHOP
          </h1>
          <div className="mt-3 text-sm font-semibold tracking-wide text-white/90 uppercase flex gap-2 justify-center items-center">
            <Link to={"/"}>Home</Link>
            <span className="text-xs">
              <IoIosArrowForward />
            </span>
            <Link to={"/all-products"}>SHOP</Link>
            <span className="text-xs">
              <IoIosArrowForward />
            </span>
            <Link to={`/${productDetails.category?.toLowerCase()}`}>
              {productDetails.category?.toLowerCase()}
            </Link>
            <span className="text-xs">
              <IoIosArrowForward />
            </span>
            <span className="line-clamp-1">{productDetails.name}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 p-6 md:flex-row text-[#2A3335] mt-20">
        {/* Product Images Section */}
        <div className="flex flex-col items-center md:w-1/2">
          {/* Main Image */}
          <div className="w-full h-[400px] bg-[#0A5EB0] rounded-lg shadow-md overflow-hidden">
            <img
              src={selectedImage}
              alt={productDetails.name}
              className="w-full h-full object-cover rounded-lg object-center transition-transform duration-300 scale-105 "
            />
          </div>

          {/* Thumbnails - Visible only if there are more images */}
          {productDetails.images && productDetails.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {productDetails.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover cursor-pointer rounded-lg transition-transform duration-300 hover:scale-105 ${
                    selectedImage === img ? "border-2 border-[#FFCFEF]" : ""
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 space-y-4">
          <div className="text-sm font-semibold flex gap-1 text-gray-600">
            <Link to={"/"}>Home</Link>
            <span>/</span>
            <Link to={`/${productDetails.category?.toLowerCase()}`}>
              {productDetails.category}
            </Link>
            <span>/</span>
            <span>{productDetails.name}</span>
          </div>
          <h2 className="text-4xl font-black tracking-wide text-[#2A3335]">
            {productDetails.name}
          </h2>
          <p className="text-gray-600 w-[75%] text-justify text-sm font-medium tracking-wide">
            {productDetails.description}
          </p>

          {/* Pricing */}
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2">
              {productDetails.offer_percentage > 0 && (
                <h5 className="text-2xl font-semibold text-gray-500 line-through">
                  ${productDetails.price}
                </h5>
              )}
              <h4 className="text-4xl font-bold text-[#2a3335]">
                ${productDetails.finalPrice}
              </h4>
            </div>

            {productDetails.offer_percentage > 0 && (
              <p className="text-sm text-red-500 font-semibold">
                {productDetails.offer_percentage}% off!
              </p>
            )}
          </div>

          {/* Stock Status */}
          <p
            className={`text-sm font-semibold ${
              productDetails.stock > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p className="text-sm text-gray-600 capitalize font-semibold tracking-wide">
            available products count: {productDetails.stock}
          </p>

          {/* Add to Cart Section */}
          <div className="flex items-center gap-4">
            <ProductQuantity stock={productDetails.stock} />
            <button
              onClick={handleAddToCart}
              className={`px-6 py-2 rounded-lg font-semibold text-white ${
                productDetails.stock > 0
                  ? "bg-[#0A5EB0] hover:bg-[#0A97B0]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={productDetails.stock === 0}
            >
              Add to Cart
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleAddToWishlist}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-300 ${
              isAddedToWishlist
                ? "bg-[#FFCFEF] text-[#0A97B0]"
                : "bg-[#0A97B0] text-white"
            }`}
          >
            <span className="text-lg font-bold">
              {isAddedToWishlist ? "♥" : "♡"}
            </span>
            {isAddedToWishlist ? "Added to Wishlist" : "Add to Wishlist"}
          </button>

          {/* Additional Information Section */}
          <div className="text-sm text-gray-400">
            <p>
              <strong>SKU:</strong> {productDetails.sku || "N/A"}
            </p>
            <p>
              <strong>Categories:</strong> {productDetails.category}
            </p>
          </div>
        </div>
      </div>
      <MoreProducts categoryName={productDetails.category} />
    </>
  );
}

export default ItemPage;
