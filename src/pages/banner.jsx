import React, { useState } from "react";
import NavBar from "../components/NavBar";
import newArrival from "../assets/frontend-images/what-kind-of-art-is-popular-right-now.jpg";

const Banner = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="bg-purple h-screen">
        <div>
          <p className="text-black text-center">
            🚀Free Shipping on orders over $100🚀
          </p>
        </div>
        <NavBar />
        <p className="float-right mr-32 font-34">New Collection Arrived</p>
        <img className="h-2/4 my-16 mx-16" src={newArrival} alt="NotFound" />
      </div>
    </div>
  );
};

export default Banner;
