import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Hero from "../components/Hero/Hero";
import LogOutBtn from "../components/LogOutBtn/LogOutBtn";

function HomePage() {
  return (
    <div>
      <NavBar />
      <Hero />
      {/* <LogOutBtn /> */}
    </div>
  );
}

export default HomePage;
