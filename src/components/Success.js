import React from 'react'

function Success() {
  return (
    <>
    <div className='flex flex-col items-center'>
        <p className='pt-[35%] text-3xl font-bold text-secondary lg:pt-20 lg:text-5xl'>YEAH! BERHASIL</p>
        <img src='/assets/image/success.png' className='pt-10 w-[70%] lg:w-[40%]' alt='success'/>
        <button className="mt-10 btn btn-md rounded-md bg-accent hover:bg-accent-hover md:btn-lg lg:px-24 lg:py-6 lg:text-2xl transition-all">
              <a href="/">
                Kembali
              </a>
        </button>
    </div>
    </>
  )
}

export default Success