import React from "react";
import { skills } from "../data";

function Brand() {
  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-6 md:grid-flow-row">
          {skills.map((skill, index) => {
            return (
              <div className="flex items-center justify-center" key={index}>
                <img src={skill.image} alt="" className="px-4 w-40"/>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Brand;
