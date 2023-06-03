'use client';

import { Dot } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface OverviewProps {
  detail: string[];
  care: string[]
}

export const Overview: React.FC<OverviewProps> = ({ detail,care }) => {
  return (
    <div className='z-10 mt-8 flex w-full flex-col items-start space-y-8 bg-white px-8 py-16 md:p-16'>
      {/* Title */}
      <div className='relative mb-6 w-full items-start sm:mb-8'>
        <p className='text-2xl font-bold'>Product Information</p>
        <div className='absolute inset-0 -z-50 flex items-center justify-start'>
          <div className='text-[45px] font-bold text-gray-100 custom1:text-[70px] sm:text-8xl sm:font-extrabold'>
            Overview
          </div>
        </div>
      </div>
      <div className='w-full border-[1px]'></div>
      {/* Details */}
      <div className='flex w-full flex-col space-y-8 sm:flex-row sm:justify-start sm:space-x-16 sm:space-y-0'>
        <p className='whitespace-nowrap font-semibold text-gray-700  md:basis-2/6'>
          PRODUCT DETAILS
        </p>

        <div className='flex-col space-y-4 md:basis-4/6'>
          {detail.map((item: string, ind) => (
            <p key={ind} className='text-justify tracking-wider text-gray-600 '>
              {item}
            </p>
          ))}
        </div>
      </div>
      {/* Care */}
      <div className='flex w-full flex-col space-y-8 sm:flex-row sm:justify-start sm:space-x-16 sm:space-y-0'>
        <p className='whitespace-nowrap font-semibold text-gray-700  md:basis-2/6'>
        PRODUCT CARE
        </p>

        <ul className='flex-col space-y-2 md:basis-4/6'>
          {care.map((item: string, ind) => (
            <li key={ind} className='flex text-justify tracking-wider text-gray-900 font-semibold'>
              <Dot/> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
