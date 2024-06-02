import React from "react";
import about from "../assets/img/7sevenabout.png";

function About() {
  return (
    <section id="about" className="section bg-black">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-24">
          <img
            className="object-cover h-full w-[566px] md:mx-auto lg:mx-0 rounded-2xl"
            src={about}
            alt="About 7Seven Billiard"
          />
          <div className="flex flex-col items-center lg:items-start lg:text-left text-white">
            <div className="flex flex-col">
              <h2 className="text-2xl mb-4 text-white ">
                TENTANG KAMI
              </h2>
              <p className="text-green-600 text-3xl lg:text-8xl font-medium lg:font-extrabold mb-3 relative before:absolute before:opacity-40 before:-top-[2rem] before:hidden before:lg:block">7Seven Billiard</p>
              <hr className="mb-8 opacity-5" />
              <p className="mb-8 text-gray-300">
                Selamat datang di 7Seven Billiard, tempat terbaik untuk menikmati permainan billiard dengan fasilitas terbaik di kota! Kami menawarkan lingkungan yang nyaman dan ramah untuk semua pengunjung. Dengan meja billiard berkualitas tinggi dan suasana yang menyenangkan, kami berkomitmen untuk memberikan pengalaman bermain yang luar biasa bagi Anda. Kunjungi kami hari ini dan rasakan sendiri keseruan bermain billiard di 7Seven!
              </p>
            </div>
            <button className="btn btn-md bg-green hover:bg-green-700 transition-all text-white">
              <a href="https://api.whatsapp.com/send?phone=6285211913891&text=Halo, saya ingin bertanya!">Hubungi Kami</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
