import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard"; // Assuming ProductCard is correctly implemented

const MoreProducts = ({ categoryName }) => {
  const [products, setProducts] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageSize] = useState(4);

  const productsAPIURL = `${import.meta.env.VITE_API_URL}/products/category`;

  useEffect(() => {
    axios
      .get(productsAPIURL, {
        params: {
          categoryName: categoryName,
          pageSize,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setPageLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching category products:", error);
      });
  }, [categoryName, pageLoaded]); // Re-fetch when `categoryName`, `pageSize`, or `currentPage` changes

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-center font-semibold uppercase text-xl text-[#2A3335] tracking-wide">
        Other Products Related to "
        <span className="text-[#0A5EB0] ">{categoryName}</span>"
      </h2>

      {/* Product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
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
    </div>
  );
};

export default MoreProducts;
