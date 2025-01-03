import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function ProductPage(props) {
  const categoryName = props.categoryName;
  const [categoryDetails, setCategoryDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [pageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const APIURL = `${import.meta.env.VITE_API_URL}/category/category-name`;

    if (categoryName) {
      axios
        .get(APIURL, { params: { name: categoryName } }) // Send query parameters
        .then((res) => {
          setCategoryDetails(res.data);
        })
        .catch((error) => {
          console.error("Error fetching category products:", error);
        });
    }
  }, [categoryName]); // Re-fetch when `categoryName` changes

  const productsAPIURL = `${import.meta.env.VITE_API_URL}/products/category`;

  useEffect(() => {
    axios
      .get(`${productsAPIURL}`, {
        params: {
          categoryName: categoryName,
          pageSize,
          pageNumber: currentPage,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setPageLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching category products:", error);
      });
  }, [categoryName, pageSize, currentPage]); // Re-fetch when `categoryName` changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!pageLoaded) {
    return (
      <LoadingScreen
        additional_hint={`Preparing your ${categoryName} products...`}
      />
    );
  }

  return (
    <>
      {/* Header section */}
      <div className="w-full h-[450px] relative">
        <img
          src={categoryDetails.image}
          alt=""
          className="w-full h-[450px] object-cover object-center rounded-md"
        />
        <div className="bg-[#0A5EB0]/35  absolute w-full h-full top-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1
            className="text-6xl font-extrabold tracking-[.9rem]"
            style={{
              textShadow: `
      2px 2px 0px #6b7280, 
      4px 4px 0px #4b5563, 
      6px 6px 0px #1f2937
    `,
              background: "linear-gradient(to right, #4facfe, #00f2fe)", // Optional gradient
              WebkitBackgroundClip: "text",
              color: "#fff",
            }}
          >
            {categoryDetails.name}
          </h1>
          <p className="mt-2 text-center text-lg font-semibold tracking-wide text-white/90">
            {categoryDetails.description}
          </p>
        </div>
      </div>
      {/* product card section */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {products.map((product) => (
          <ProductCard
            key={product.product_id} // Use a unique key
            id={product.product_id}
            title={product.name}
            finalPrice={product.finalPrice}
            price={product.price}
            discount={product.offer_percentage}
            description={product.description}
            rating={product.ratings}
            image={product.images[0]} // Assuming images is an array
            isNew={false}
            isTop={false}
          />
        ))}
      </div>

      {/* Pagination Controls */}
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

export default ProductPage;
