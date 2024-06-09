import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import Component
import Nav from "../components/Nav";
import NavMobile from "../components/NavMobile";

const Header = () => {
  const [bg, setBg] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    // Periksa apakah pengguna sudah login
    const token = localStorage.getItem("token");
    if (token) {
      setShowButton(false);
    }

    const handleScroll = () => {
      window.scrollY > 50 ? setBg(true) : setBg(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fungsi untuk mengubah tampilan button
  const hideButton = () => {
    setShowButton(false);
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    // Redirect ke halaman login atau halaman lain yang sesuai
    window.location.href = "/"; // Ganti "/login" dengan rute yang sesuai
  };

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
            {/* Menggunakan logika kondisional untuk menampilkan button */}
            {showButton && (
              <button className="btn px-7 py-1 rounded-md bg-green hover:bg-green-700 md:btn-lg transition-all text-white">
                <a href="https://seven-backend-api.vercel.app/api/v1/cms/google">
                  Login
                </a>
              </button>
            )}
            {/* Tombol logout */}
            {!showButton && (
              <button className="btn px-7 py-1 rounded-md bg-green hover:bg-red-700 md:btn-lg transition-all text-white" onClick={handleLogout}>
                Logout
              </button>
            )}

            {!showButton && (
              <a href="/my-booking" className="btn px-7 py-1 rounded-md bg-green hover:bg-red-700 md:btn-lg transition-all text-white">
               My Booking
              </a>
            )}
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
