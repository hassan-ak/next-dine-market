'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface ImageSectionProps {
  urls: string[];
}


export const ImageSection: React.FC<ImageSectionProps> = ({ urls }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className='flex w-full space-x-10 justify-between'>
      <div className='flex flex-col space-y-4 min-w-[50px] custom1:min-w-[80px] sm:min-w-[100px]'>
        {urls?.map((item, ind) => (
          <Image
            key={ind}
            src={item}
            className='cursor-pointer object-cover w-[50px] h-auto custom1:min-w-[80px] sm:min-w-[100px] bg-blue-100'
            onMouseEnter={() => setIndex(ind)}
            alt='product image'
            width={100}
            height={100}
            priority
          />
        ))}
      </div>
      <div className='overflow-hidden'>
        <Image
          src={urls[index]}
          alt='product image'
          width={750}
          height={750}
          className='object-cover rounded-xl bg-blue-100'
          priority
        />
      </div>
    </div>
  );
};
