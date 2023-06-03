import Image from 'next/image';
import React from 'react';
import hero from '@/../public/hero.png';
import hero1 from '@/../public/hero1.png';
import hero2 from '@/../public/hero2.png';
import hero3 from '@/../public/hero3.png';
import hero4 from '@/../public/hero4.png';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className='flex w-full flex-row items-start space-x-10'>
      {/*** hero left ***/}
      <div className='flex flex-col space-y-10 lg:basis-5/12'>
        {/*** hero left - text ***/}
        <p className='mt-10 w-fit rounded-lg bg-blue-100 px-6 py-2 font-semibold text-blue-900'>
          Sale 70%
        </p>
        <h1 className='text-5xl font-bold tracking-wide text-[#212121]'>
          An Industrial Take on Streetwear
        </h1>
        <p className='w-[75%] text-gray-600'>
          Anyone can beat you but no one can beat your outfit as long as you
          wear Dine outfits.
        </p>
        {/*** hero left - button ***/}
        <Link href={'/products'} className='cursor-pointer'>
          <Button className='inline-flex h-10 w-auto space-x-2 bg-[#212121] px-8 focus-visible:bg-[#212121] sm:w-[50%] lg:h-20 lg:w-fit'>
            <ShoppingCart size={20} />
            <p className='my-5 inline-flex flex-row items-center justify-center space-x-1 lg:flex-col lg:space-x-0 2xl:flex-row 2xl:space-x-1'>
              <span>Start</span>
              <span>Shoping</span>
            </p>
          </Button>
        </Link>
        {/*** hero left - promos ***/}
        <div className='flex flex-wrap items-center justify-around gap-4'>
          <Image src={hero1} alt='hero1' priority></Image>
          <Image src={hero2} alt='hero2' priority></Image>
          <Image src={hero3} alt='hero3' priority></Image>
          <Image src={hero4} alt='hero5' priority></Image>
        </div>
      </div>
      {/*** hero right ***/}
      <div className='hidden basis-7/12 justify-end lg:flex'>
        <div className='h-[575px] w-[575px] overflow-visible rounded-full bg-[#ffece3]'>
          <Image
            className='mx-auto -mt-5 h-[604px] w-[628px]'
            src={hero}
            alt='hero image'
          />
        </div>
      </div>
    </div>
  );
};
