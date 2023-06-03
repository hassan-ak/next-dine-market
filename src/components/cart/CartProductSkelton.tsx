import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const CartProductSkelton = ({}) => {
  return (
    <div className='flex flex-col space-y-10 rounded-md bg-gray-50 p-5 sm:flex-row sm:items-stretch sm:space-x-10 sm:space-y-0'>
      <div className='flex flex-row justify-between sm:basis-1/3'>
        <Skeleton className='h-[133px] w-[125px] rounded-xl bg-gray-200 object-cover custom1:h-[160px] custom1:w-[150px] sm:h-[187px] sm:w-[175px]' />
        <div className='inline-flex flex-col items-end justify-between sm:hidden'>
          <Skeleton className='h-[32px] w-[32px] rounded-full bg-gray-200' />
          <Skeleton className='h-[32px] w-16 rounded-xl bg-gray-200' />
        </div>
      </div>
      <div className='flex flex-col space-y-2 sm:basis-2/3 sm:justify-between'>
        <Skeleton className='h-[32px] w-full rounded-xl bg-gray-200' />
        <Skeleton className='h-[32px] w-full rounded-xl bg-gray-200' />
        <Skeleton className='h-[32px] w-full rounded-xl bg-gray-200' />
        <Skeleton className='h-[32px] w-full rounded-xl bg-gray-200' />
        <div className='inline-flex items-center justify-between'>
          <Skeleton className='h-[32px] w-10 rounded-xl bg-gray-200' />
          <span className='inline-flex items-center justify-between space-x-1'>
            <Skeleton className='h-[32px] w-[32px] rounded-full bg-gray-200' />
            <Skeleton className='h-[32px] w-10 rounded-xl bg-gray-200' />
            <Skeleton className='h-[32px] w-[32px] rounded-full bg-gray-200' />
          </span>
        </div>
      </div>
    </div>
  );
};
