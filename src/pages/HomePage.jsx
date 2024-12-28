import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Hero from "../components/Hero/Hero";
import LogOutBtn from "../components/LogOutBtn/LogOutBtn";
import BrandLogos from "../components/BrandLogos/BrandLogos";
import LesetProducts from "../components/LetestProducts/LetestProducts";
import CouponCard from "../components/Promotions/Promotions";

function HomePage() {
  return (
    <div>
      <NavBar />
      <Hero />
      {/* <LogOutBtn /> */}
      <BrandLogos />
      <LesetProducts />
      <CouponCard
        discount={50}
        categoryItems={30}
        expiry="2024-12-29T23:59:59"
      />
      ;
    </div>
  );
}

export default HomePage;
