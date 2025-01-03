import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import toast from "react-hot-toast";

const LetestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const APIURL = `${import.meta.env.VITE_API_URL}/products/latest-products`;

  useEffect(() => {
    axios
      .get(APIURL)
      .then((res) => {
        setProducts(res.data.products); // Assuming `products` is an array

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest products:", error);
        setError("Failed to load latest products");
        toast.error("Failed to load latest products");
        setLoading(false);
      });
  }, []);

  return (
    <section className="mt-20">
      <div className="container mx-auto">
        <h2 className="text-center font-semibold uppercase text-[18px] text-[#0A5EB0] tracking-wide">
          Check Out
        </h2>
        <h1 className="text-center text-3xl uppercase tracking-widest font-bold text-[#2A3335] mt-1">
          Our Latest Products
        </h1>

        {/* Loading State */}
        {loading && <p className="text-center mt-10">Loading...</p>}

        {/* Error State */}
        {error && <p className="text-center text-red-500 mt-10">{error}</p>}

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {products.map((product) => (
            <ProductCard
              key={product.id} // Use a unique key
              id={product.product_id}
              title={product.name}
              finalPrice={product.finalPrice}
              price={product.price}
              discount={product.offer_percentage}
              description={product.description}
              rating={product.ratings}
              image={product.images[0]} // Assuming images is an array
              isNew={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LetestProducts;
