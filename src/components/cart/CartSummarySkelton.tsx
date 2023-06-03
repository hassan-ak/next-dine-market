import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const CartSummarySkelton = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-7 rounded-md bg-gray-100 p-5 text-[#181818]'>
      <p className='w-full text-xl font-bold'>Order Summary</p>
      <div className='flex w-full'>
        <Skeleton className='h-[24px] w-full bg-gray-300' />
      </div>
      <div className='flex w-full'>
        <Skeleton className='h-[24px] w-full bg-gray-300' />
      </div>
      <div className='flex w-full'>
        <Skeleton className='h-[40px] w-full bg-gray-300' />
      </div>
    </div>
  );
};
