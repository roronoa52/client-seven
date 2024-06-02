import React, { useState, useEffect } from "react";

// Import Component
import Nav from "../components/Nav";
import NavMobile from "../components/NavMobile";

const Header = () => {
  const [bg, setBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setBg(true) : setBg(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        bg ? "bg-white text-black h-20" : "bg-black text-green h-24"
      } flex items-center fixed top-0 w-full z-10 transition-all duration-300`}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* logo */}
        <a href="/">
          <h1 className={`text-4xl font-bold ${bg ? "text-black" : "text-white"}`}>7 Seven</h1>
        </a>
        {/* nav */}
        <div className="lg:block hidden">
          <Nav />
        </div>
        {/* socials */}
        <div className="lg:block hidden">
          <div className="flex gap-2">
            <button className="btn px-7 py-1 rounded-md bg-green hover:bg-green-700 md:btn-lg transition-all text-white">
              <a href="/booking">
                Pesan Sekarang
              </a>
            </button>
          </div>
        </div>
        {/* NavMobile */}
        <div className="lg:hidden">
          <NavMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;
