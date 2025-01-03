import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import toast from "react-hot-toast";

function BestSelling() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const APIURL = `${import.meta.env.VITE_API_URL}/orders/top-ordered-products`;

  useEffect(() => {
    axios
      .get(APIURL)
      .then((res) => {
        setProducts(res.data); // Assuming `products` is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching best selling products:", error);
        setError("Failed to load best selling products");
        toast.error("Failed to load best selling products");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-center font-semibold uppercase text-[18px] text-[#0A5EB0] tracking-wide">
        Check Out
      </h2>
      <h1 className="text-center text-3xl uppercase tracking-widest font-bold text-[#2A3335] mt-1">
        Our Best Selling Products
      </h1>

      {/* Show loader or error if needed */}
      {loading && <p className="text-center mt-10">Loading...</p>}
      {error && <p className="text-center mt-10 text-red-500">{error}</p>}

      {/* Product cards */}
      {!loading && !error && (
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
              isTop={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BestSelling;
