import React from 'react'
import Container from '../container/Container'
import hero_image from "../../images/hero.png"


const Hero = () => {
  return (
    <div className='w-full bg-[#F2F0F1] '>
      <Container>
        <div className='flex  items-center justify-between'>
          <div className='flex flex-col gap-8 py-[120px]'>
            <div className="w-[577px] text-black text-[64px] font-bold  leading-[64px]">FIND CLOTHES THAT MATCHES YOUR STYLE
            </div>
            <div className="w-[555px] text-black/60 text-base font-normal  leading-snug">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </div>
            <button className="w-full max-w-[200px] py-3 px-16 text-white rounded-[62px]  bg-[#000] transition-transform hover:bg-[#1b1b1bd3]   active:scale-90">Shop now
            </button>
            <div className='flex w-full max-w-[600px] items-center justify-between mt-3'>
              <div className='flex flex-col border-r pr-8'>
                <strong className='font-bold text-[#000] text-[40px]'>
                  200+
                </strong>
                <span className='text-[#0000008f] text-base font-normal'>
                  International Brands
                </span>
              </div>
              <div className='flex flex-col border-r pr-8'>
                <strong className='font-bold text-[#000] text-[40px]'>
                  2,000+
                </strong>
                <span className='text-[#0000008f] text-base font-normal'>
                  High-Quality Products
                </span>
              </div>
              <div className='flex flex-col '>
                <strong className='font-bold text-[#000] text-[40px]'>
                  30,000 +
                </strong>
                <span className='text-[#0000008f] text-base font-normal'>
                  Happy Customers
                </span>
              </div>
            </div>
          </div>
          <div className='flex items-end justify-end'>
            <img src={hero_image} alt="" className='w-[500px]' />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
