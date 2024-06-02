import React from "react";
import pet from "../assets/img/7seven (1).png";

function Hero() {
  return (
<section
      id="home"
      className="lg:h-[90vh] flex items-center bg-black lg:bg-cover lg:bg-center lg:bg-no-repeat py-32 lg:py-0 overflow-hidden"
    >
      <div className="container mx-auto h-full">
        <div className="flex items-center h-full pt-8">
          {/* Left */}
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <h1 className="text-white text-4xl text-center leading-[44px] md:text-5xl md:leading-tight lg:text-left lg:text-6xl lg:leading-[1.2] font-bold md:tracking-[-2px]">
              Selamat Datang di 7Seven Billiard!
            </h1>
            <p className="pt-4 pb-8 md:pt-6 md:pb-12 max-w-[480px] text-lg text-center lg:text-left text-gray-300">
              Nikmati pengalaman bermain billiard terbaik dengan fasilitas lengkap dan nyaman di 7Seven.
            </p>
            <button className="btn btn-md bg-green hover:bg-green-700 md:btn-lg transition-all text-white">
              <a href="/booking">
                Pesan Sekarang
              </a>
            </button>
          </div>
          {/* Right */}
          <div className="hidden lg:flex flex-1 justify-center items-center h-full">
            <img src={pet} className="w-[30rem]" alt="Billiard Table" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
