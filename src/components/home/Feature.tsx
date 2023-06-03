import React from 'react';
import feature from '@/../public/feature.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export const Feature = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center pt-6'>
      {/* Title */}
      <div className='z-10 flex w-full flex-row'>
        <div className='hidden basis-7/12 xl:block'></div>
        <div className='basis-full px-5 text-5xl font-bold leading-[55px] tracking-wide md:px-16 xl:basis-5/12 xl:px-0'>
          Unique and Authentic Vintage Designer Jewellery
        </div>
      </div>
      {/* Body */}
      <div className='z-0 -mt-[104px] flex w-full flex-col space-x-0 space-y-10 bg-[#eaeffa57] px-10 pb-10 pt-32 md:-mt-[56px] md:pt-24 xl:flex-row xl:space-x-10 xl:space-y-0'>
        {/* left */}
        <div className='relative flex basis-1/2 flex-col items-center justify-center space-y-8 text-[#212121]'>
          {/* Left top */}
          <div className='flex basis-1/2 flex-col justify-between space-y-8 sm:flex-row sm:space-x-14 sm:space-y-0'>
            {/* Top left */}
            <div className='flex basis-1/2 flex-col items-start justify-center'>
              <p className='text-lg font-semibold leading-4'>
                Using Good Quality Materials
              </p>
              <p className='mt-3 text-base font-light'>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
            {/* Top right */}
            <div className='flex basis-1/2 flex-col items-start justify-center'>
              <p className='text-lg font-semibold leading-4'>
                100% Handmade Products
              </p>
              <p className='mt-3 text-base font-light'>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          {/* Left bottom */}
          <div className='flex basis-1/2 flex-col justify-between space-y-8 sm:flex-row sm:space-x-14 sm:space-y-0'>
            {/* bottom left */}
            <div className='flex basis-1/2 flex-col items-start justify-center'>
              <p className='text-lg font-semibold leading-4'>
                Modern Fashion Design
              </p>
              <p className='mt-3 text-base font-light'>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
            {/* bottom right */}
            <div className='flex basis-1/2 flex-col items-start justify-center'>
              <p className='text-lg font-semibold leading-4'>
                Discount for Bulk Orders
              </p>
              <p className='mt-3 text-base font-light'>
                Lorem ipsum dolor sit amt, consectetur adipiscing elit.
              </p>
            </div>
          </div>
          {/* BG */}
          <div className='absolute inset-0 -z-40 flex items-center justify-center'>
            <div className='text-[60px] font-bold text-gray-200 sm:text-[75px] sm:font-bold md:text-8xl md:font-extrabold'>
              Different from others
            </div>
          </div>
        </div>
        {/* Right */}
        <div className='flex basis-full flex-col items-center space-x-3 space-y-10 sm:flex-row sm:space-y-0 xl:basis-1/2 xl:items-stretch xl:space-x-8'>
          <div className='flex basis-2/5 xl:basis-3/5'>
            <Image src={feature} alt='feature bg-blue-100' priority></Image>
          </div>
          <div className='flex basis-3/5 flex-col justify-between space-y-10 xl:basis-2/5'>
            <p className='text-justify text-base font-light text-[#212121]'>
              This piece is ethically crafted in our small family-owned workshop
              in Peru with unmatched attention to detail and care. The Natural
              color is the actual natural color of the fiber, undyed and 100%
              traceable.
            </p>
            <Link href={'/products'} className='z-40 '>
              <button className='w-fit cursor-pointer whitespace-nowrap bg-[#212121] px-5 py-2 text-white sm:w-2/3 sm:whitespace-normal'>
                See All Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
