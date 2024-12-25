import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const posts = [
  {
    category: "Makeup",
    title: "Transform Your Look",
    description:
      "Discover bold, vibrant shades and essentials to elevate your beauty routine.",
    image:
      "https://as2.ftcdn.net/v2/jpg/02/73/55/33/1000_F_273553300_sBBxIPpLSn5iC5vC8FwzFh6BJDKvUeaC.jpg", // Replace with your custom image URL
    cta: "Shop Makeup",
    url: "/makeup",
  },
  {
    category: "Skin Care",
    title: "Glow Naturally",
    description:
      "Explore hydrating and nourishing skincare products for every skin type.",
    image:
      "https://www.bellobello.my/wp-content/uploads/2022/08/boldlipessentials-2.jpg", // Replace with your custom image URL
    cta: "Shop Skincare",
    url: "/skincare",
  },
  {
    category: "Hair Care",
    title: "Shine Bright",
    description:
      "Find shampoos, conditioners, and styling products to achieve perfect hair.",
    image: "https://nuvari.pk/cdn/shop/collections/HAIRCARE.jpg?v=1701010194", // Replace with your custom image URL
    cta: "Shop Hair Care",
    url: "/haircare",
  },
  {
    category: "Fragrance",
    title: "Irresistible Scents",
    description:
      "Discover perfumes and colognes to make every moment unforgettable.",
    image:
      "https://www.realmenrealstyle.com/wp-content/uploads/2024/01/What-Are-Niche-Fragrances.jpg", // Replace with your custom image URL
    cta: "Shop Fragrances",
    url: "/fragrances",
  },
];

const HeroSection = () => {
  const [currentPost, setCurrentPost] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPost((prevPost) => (prevPost + 1) % posts.length);
    }, 5000); // Change post every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative w-[95%] lg:w-full h-[60vh] bg-[#2A3335] overflow-hidden container mx-auto mt-5 rounded-lg px-4 lg:px-8">
      {posts.map((post, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 flex flex-col lg:flex-row items-center lg:items-stretch ${
            currentPost === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{
            opacity: currentPost === index ? 1 : 0,
            x: currentPost === index ? 0 : index % 2 === 0 ? -50 : 50,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {index % 2 === 0 ? (
            <>
              {/* Left Side - Image */}
              <div
                className="relative w-full lg:w-1/2 h-[40vh] lg:h-full bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                style={{ backgroundImage: `url(${post.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 rounded-lg"></div>
              </div>
              {/* Right Side - Text */}
              <div className="flex flex-col justify-center items-start w-full lg:w-1/2 p-6 lg:p-12 bg-[#2A3335] rounded-lg shadow-lg">
                <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-2">
                  {post.category}
                </h2>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-md text-white mb-6 leading-relaxed">
                  {post.description}
                </p>
                <Link to={post.url}>
                  <motion.button
                    className="bg-[#0A97B0] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0A5EB0] transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {post.cta}
                  </motion.button>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Left Side - Text */}
              <div className="flex flex-col justify-center items-start w-full lg:w-1/2 p-6 lg:p-12 bg-[#2A3335] rounded-lg shadow-lg">
                <h2 className="text-md font-bold text-white uppercase tracking-widest mb-2">
                  {post.category}
                </h2>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-md text-white mb-6 leading-relaxed">
                  {post.description}
                </p>
                <Link to={post.url}>
                  <motion.button
                    className="bg-[#0A97B0] text-white px-4 py-2 rounded-lg text-md font-semibold hover:bg-[#0A5EB0] transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {post.cta}
                  </motion.button>
                </Link>
              </div>
              {/* Right Side - Image */}
              <div
                className="relative w-full lg:w-1/2 h-[60vh] lg:h-full bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                style={{ backgroundImage: `url(${post.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 rounded-lg"></div>
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default HeroSection;
