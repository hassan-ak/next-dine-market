'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast, { Toaster } from 'react-hot-toast';

export const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleButtonSubmit = () => {
    if (validateEmail(email)) {
      setEmail('');
      toast.success('Successfully Subscribe!');
    } else {
      toast.error('Error : Email not Valid');
    }
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='pt-6 mx-auto'>
      <div className='relative'>
        {/* News Letter Component */}
        <div className='flex flex-col items-center justify-center py-10'>
          {/* Title and description */}
          <h3 className='mb-2 px-5 text-center text-3xl font-bold tracking-normal text-[#212121] sm:mb-4 sm:text-4xl'>
            Subscribe Our Newsletter
          </h3>
          <p className='mb-4 px-5 text-center text-base tracking-normal text-gray-700 sm:mb-8'>
            Get the latest information and promo offers directly
          </p>
          {/* Input and button */}
          <div className='mx-auto flex w-full max-w-xl flex-col items-center space-x-0 space-y-3 px-1 sm:flex-row sm:space-x-3 sm:space-y-0 sm:px-5'>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='rounded-none border-[1px] border-gray-600 focus:rounded-md focus:border-black focus-visible:border-[2px] focus-visible:ring-0'
            />
            <Button
              type='submit'
              onClick={() => {
                handleButtonSubmit();
              }}
              className='inline-block w-auto whitespace-nowrap bg-[#212121] px-5 focus-visible:bg-[#212121]'
            >
              Get Started
            </Button>
            <Toaster position='bottom-center' />
          </div>
        </div>
        {/* News Letter Back-ground */}
        <div className='absolute inset-0 -z-50 flex items-center justify-center'>
          <div className='text-[54px] font-bold text-gray-200 sm:text-8xl sm:font-extrabold'>
            Newsletter
          </div>
        </div>
      </div>
    </div>
  );
};
