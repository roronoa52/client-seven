import React from "react";
import Projects from "./Projects";

function NewProduct() {
  return (
    <Fade bottom cascade>
    <section id="portfolio" className="section bg-white min-h-[1400px]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="section-title  text-secondary relative before:absolute before:opacity-40 before:-top-[2rem] before:-left-3/4 before:hidden lg:text-5xl before:lg:block">
          BARANG TERBARU
          </h2>
          <p className="pb-10">
            Setiap barang baru akan ditampilkan
          </p>
        </div>
        <Projects />
      </div>
    </section>
    </Fade>
  );
}

export default NewProduct;
