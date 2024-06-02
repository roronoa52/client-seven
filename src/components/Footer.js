import React from "react";
import { FiInstagram} from "react-icons/fi";
import {AiOutlineWhatsApp} from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="bg-tertiary py-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 items-center justify-between">
          <div className="flex space-x-6 items-center justify-center">
          <li className='flex justify-center text-accent'>
        <a className='text-base px-6' href="https://instagram.com">
          <FiInstagram/>
        </a>
        <a className='text-base' href="https://api.whatsapp.com/send?phone=6281313562775&text=Halo, saya ingin bertanya!">
          <AiOutlineWhatsApp/>
        </a>
      </li>
          </div>

          <div>
            <h1 className="text-4xl">7 Seven</h1>
          </div>

          <p>&copy; 2024 Fahrur Rozi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
