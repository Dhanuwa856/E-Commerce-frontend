import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Hero from "../components/Hero/Hero";
import LogOutBtn from "../components/LogOutBtn/LogOutBtn";
import BrandLogos from "../components/BrandLogos/BrandLogos";

function HomePage() {
  return (
    <div>
      <NavBar />
      <Hero />
      {/* <LogOutBtn /> */}

      <BrandLogos />
    </div>
  );
}

export default HomePage;
