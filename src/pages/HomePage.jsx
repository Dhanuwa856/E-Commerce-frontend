import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Hero from "../components/Hero/Hero";
import LogOutBtn from "../components/LogOutBtn/LogOutBtn";
import BrandLogos from "../components/BrandLogos/BrandLogos";
import LesetProducts from "../components/LetestProducts/LetestProducts";
import BestSelling from "../components/BestSelling/BestSelling";
import PromoBanner from "../components/Promotions/Promotions";
import Footer from "../components/Footer/Footer";

function HomePage() {
  return (
    <div>
      <Hero />
      {/* <LogOutBtn /> */}
      <BrandLogos />
      <LesetProducts />
      <PromoBanner />
      <BestSelling />;
    </div>
  );
}

export default HomePage;
