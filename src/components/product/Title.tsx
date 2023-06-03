import React from 'react';

interface TitlePtops {
  title: string;
  type: string;
}

export const Title: React.FC<TitlePtops> = ({ title, type }) => {
  return (
    <div className='flex w-full flex-col items-start justify-start'>
      <p className='text-2xl lg:text-3xl font-normal text-[#212121]'>{title}</p>
      <p className='text-xl font-semibold text-gray-400'>{type}</p>
    </div>
  );
};
