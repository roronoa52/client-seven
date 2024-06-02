import React from 'react'

const Nav = () => {
  return (
    
    <nav>
      <ul className='flex space-x-8 capitalize text-base font-medium'>
        <a href='/'>Beranda</a>
        <a href='/#about'>Tentang</a>
        <a href='/product'>Produk</a>
      </ul>
    </nav>
    
  )
}

export default Nav