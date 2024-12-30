import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { FaFilter, FaDollarSign, FaSort, FaSearch } from "react-icons/fa";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [pageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/products/category`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL, {
          params: {
            categoryName: category,
            pageSize,
            pageNumber: currentPage,
            priceRange: priceRange !== "All" ? priceRange : undefined,
            sortBy: sortOption !== "Default" ? sortOption : undefined,
            searchTerm: searchTerm !== "" ? searchTerm : undefined,
          },
        });
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setPageLoaded(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, pageSize, currentPage, priceRange, sortOption, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!pageLoaded) {
    return <LoadingScreen additional_hint="Preparing your products..." />;
  }

  return (
    <>
      {/* Header Section */}
      <div className="w-full h-[450px] relative">
        <img
          src="/all.png"
          alt="Header"
          className="w-full h-[450px] object-cover object-center rounded-md"
        />
        <div className="bg-[#0A5EB0]/35 absolute w-full h-full top-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-6xl font-extrabold tracking-[.9rem]">
            All Products
          </h1>
          <p className="mt-2 text-lg font-semibold">
            Explore our curated collection of beauty products.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto bg-white/40  shadow-md rounded-lg p-6 mt-5">
        <div className="flex flex-wrap gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="w-full sm:flex-1">
            <label
              htmlFor="search-bar"
              className="flex items-center mb-1 font-semibold"
            >
              <FaSearch className="mr-2 text-[#0A97B0]" />
              Search
            </label>
            <input
              id="search-bar"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full border rounded-lg px-4 py-2 focus:outline-[#0A97B0] shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-auto">
            <label
              htmlFor="category-filter"
              className="flex items-center mb-1 font-semibold"
            >
              <FaFilter className="mr-2 text-[#0A97B0]" />
              Category
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none border rounded-lg px-5 py-2 focus:outline-[#0A97B0] shadow-sm"
            >
              <option value="All">All Categories</option>
              <option value="Makeup">Makeup</option>
              <option value="SkinCare">Skin Care</option>
              <option value="HairCare">Hair Care</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="w-full sm:w-auto">
            <label
              htmlFor="price-filter"
              className="flex items-center mb-1 font-semibold"
            >
              <FaDollarSign className="mr-2 text-[#0A97B0]" />
              Price Range
            </label>
            <select
              id="price-filter"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="appearance-none border rounded-lg px-5 py-2 focus:outline-[#0A97B0] shadow-sm"
            >
              <option value="All">All Prices</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
            </select>
          </div>

          {/* Sort Option */}
          <div className="w-full sm:w-auto">
            <label
              htmlFor="sort-filter"
              className="flex items-center mb-1 font-semibold"
            >
              <FaSort className="mr-2 text-[#0A97B0]" />
              Sort By
            </label>
            <select
              id="sort-filter"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none border rounded-lg px-5 py-2 focus:outline-[#0A97B0] shadow-sm"
            >
              <option value="Default">Default</option>
              <option value="PriceLowHigh">Price: Low to High</option>
              <option value="PriceHighLow">Price: High to Low</option>
              <option value="Newest">Newest Arrivals</option>
              <option value="TopRated">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            title={product.name}
            finalPrice={product.finalPrice}
            price={product.price}
            discount={product.offer_percentage}
            description={product.description}
            rating={product.ratings}
            image={product.images[0]}
            isNew={false}
            isTop={false}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 mb-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-[45px] h-[45px] flex items-center justify-center rounded-md font-bold border transition-all duration-300
         ${
           currentPage === page
             ? "bg-[#0A5EB0] text-white shadow-lg shadow-[#0A5EB0]/50 scale-105"
             : "bg-[#FFCFEF] text-[#2A3335] border-[#0A97B0] hover:bg-[#0A97B0] hover:text-white hover:shadow-md"
         }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default AllProducts;
