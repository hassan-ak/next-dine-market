/**
 * Footer
 * Desktop + Mobile
 */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/../public/logo.png';
import { SocialIcon } from 'react-social-icons';

export const Footer = () => {
  return (
    <div className='mt-5'>
      {/*** Footer Section 01 - Top ***/}
      <div className='flex w-[60%] flex-col items-start justify-between space-y-10 px-5 py-4 sm:px-10 md:px-16 md:py-8 lg:mx-auto lg:w-[100%] lg:flex-row lg:space-x-32 lg:space-y-0 lg:px-20'>
        {/*** Footer top - section 01 ***/}
        <div className='flex basis-2/5 flex-col space-y-8'>
          <Link href={'/'} className='cursor-pointer'>
            <Image src={logo} alt='logo' priority />
          </Link>
          <p className='mt-3 text-gray-600'>
            Small, artisan label that offers a thoughtfully curated collection
            of high quality everyday essentials made.
          </p>
          <div className='flex space-x-4'>
            <div className='rounded-lg bg-gray-100'>
              <SocialIcon
                url='https://www.twitter.com'
                bgColor='none'
                fgColor='black'
              />
            </div>
            <div className='rounded-lg bg-gray-100'>
              <SocialIcon
                url='https://www.facebook.com'
                bgColor='none'
                fgColor='black'
              />
            </div>
            <div className='rounded-lg bg-gray-100'>
              <SocialIcon
                url='https://www.linkedin.com'
                bgColor='none'
                fgColor='black'
              />
            </div>
          </div>
        </div>
        {/*** Footer top - section 02 ***/}
        <div className='flex basis-1/5 flex-col space-y-5'>
          <p className='text-xl font-semibold text-gray-700'>Company</p>
          <ul className='space-y-3 text-gray-600'>
            <li className='cursor-pointer'>About</li>
            <li className='cursor-pointer'>Terms of Use</li>
            <li className='cursor-pointer'>Privacy Policy</li>
            <li className='cursor-pointer'>How it Works</li>
            <li className='cursor-pointer'>Contact Us</li>
          </ul>
        </div>
        {/*** Footer top - section 03 ***/}
        <div className='flex basis-1/5 flex-col space-y-5'>
          <p className='text-xl font-semibold text-gray-700'>Support</p>
          <ul className='space-y-3 text-gray-600'>
            <li className='cursor-pointer'>Support Carrer</li>
            <li className='cursor-pointer'>24h Service</li>
            <li className='cursor-pointer'>Quick Chat</li>
          </ul>
        </div>
        {/*** Footer top - section 04 ***/}
        <div className='flex basis-1/5 flex-col space-y-5'>
          <p className='text-xl font-semibold text-gray-700'>Contact</p>
          <ul className='space-y-3 text-gray-600'>
            <li className='cursor-pointer'>Whatsapp</li>
            <li className='cursor-pointer'>Support 24h</li>
          </ul>
        </div>
      </div>
      {/*** Footer Section 02 - Bottom ***/}
      <div className='mt-5 border-t-[1px] border-t-black text-gray-500'>
        <div className='flex flex-col items-start justify-between space-x-0 space-y-5 px-5 py-4 sm:px-10 md:px-16 md:py-8 lg:flex-row lg:space-x-20 lg:space-y-0 lg:px-20'>
          <div className=''>Copyright © 2022 Dine Market</div>
          <div className=''>
            Design by.{' '}
            <span className='text-lg font-semibold text-gray-900'>
              Weird Design Studio
            </span>
          </div>
          <div className=''>
            Code by.{' '}
            <span className='text-lg font-semibold text-gray-900'>
              hassan-ak on github
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
