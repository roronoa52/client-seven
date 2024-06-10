import React, { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { MenuAlt3Icon } from '@heroicons/react/outline'
import { motion } from 'framer-motion'

function NavMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    // Periksa apakah pengguna sudah login
    const token = localStorage.getItem("token");
    if (token) {
      setShowButton(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const circleVariants = {
    hidden:{
      scale: 0
    },
    visible: {
      scale:180,
      transition: {
        type: 'spring',
        stiffness: 160,
        damping: 60,
      }
    }
  }

  const ulVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition:{
        delay: 0.1
      }
    }
  }

  return (
    <nav className='relative'>
      <div onClick={() => setIsOpen(true)} className='cursor-pointer text-primary'>
        <MenuAlt3Icon className='w-8 h-8'/>
      </div>

      <motion.div variants={circleVariants} initial='hidden' animate={isOpen ? 'visible' : 'hidden'} className='w-4 h-4 rounded-full fixed top-0 right-0 bg-accent'></motion.div>

      <motion.ul variants={ulVariants} initial='hidden' animate={isOpen ? 'visible' : ''} className={`${isOpen ? 'right-0' : '-right-full'} fixed top-0 bottom-0 w-full flex flex-col justify-center items-center transition-all duration-300 overflow-hidden`}>

        <div onClick={() => setIsOpen(false)} className='cursor-pointer absolute top-8 right-8'>
          <XIcon className='w-8 h-8'/>
        </div>
        <a className='text-white text-xl cursor-pointer capitalize pb-5' href='/'>Beranda</a>
        <a className='text-white text-xl cursor-pointer capitalize pb-5' href='/#about'>Tentang</a>
        <a className='text-white text-xl cursor-pointer capitalize pb-10' href='/product'>Produk</a>
        <div className='flex flex-col gap-[5px]'>
          {showButton && (
                <button className="text-white text-xl cursor-pointer capitalize border-4 font-bold px-5 py-2">
                  <a href="https://seven-backend-api.vercel.app/api/v1/cms/google">
                    Login
                  </a>
                </button>
              )
          }
          {!showButton && (
              <button className="btn px-7 py-1 rounded-md bg-green hover:bg-red-700 md:btn-lg transition-all text-white" onClick={handleLogout}>
                Logout
              </button>
            )
          }
          {!showButton && (
              <a href="/my-booking" className="btn px-7 py-1 rounded-md bg-green hover:bg-red-700 md:btn-lg transition-all text-white">
               My Booking
              </a>
            )
          }
          
        </div>
      </motion.ul>
    </nav>
  )
}

export default NavMobile