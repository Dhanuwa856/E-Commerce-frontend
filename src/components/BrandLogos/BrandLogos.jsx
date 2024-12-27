import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandLogos = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Default slides
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480, // Mobile screens
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const logos = [
    "/brandlogo01.jpg",
    "/brandlogo02.jpg",
    "/brandlogo03.avif",
    "/brandlogo04.jpg",
    "/brandlogo05.jpg",
    "/brandlogo06.png",
  ];

  return (
    <div className="brand-logos my-8 container mx-auto">
      {/* <h2 className="text-center text-2xl font-bold mb-6">Our Brands</h2> */}
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="p-4">
            <img
              src={logo}
              alt={`Brand logo ${index + 1}`}
              className="mx-auto w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] object-contain rounded-full shadow-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandLogos;
