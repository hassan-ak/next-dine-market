'use client';

import Image from 'next/image';
import React, { useContext, useState } from 'react';
import logo from '@/../public/logo.png';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

import { useEffect } from 'react';
import { setUserIdentifier, getUserIdentifier } from '@/lib/cookie';
import { v4 as uuidv4 } from 'uuid';
import { DineMarketContext } from '@/context/DineMarketContext';
import { Skeleton } from '../ui/skeleton';

export const Navbar = () => {
  const dmContext = useContext(DineMarketContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [reFetch, setReFetch] = useState(false);

  async function getNumCartItems(userId: string) {
    fetch(`${baseUrl}api/numCartItems?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((response) => {
        if (response[0].numItems) {
          dmContext?.setCartItems(response[0].numItems);
        } else {
          dmContext?.setCartItems(0);
        }
      })
      .catch(() => {
        dmContext?.setCartItems(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function generateUserIdentifier(): string {
    return uuidv4();
  }

  useEffect(() => {
    // Check if the user identifier exists
    const identifier = getUserIdentifier();
    if (!identifier) {
      // Generate a new identifier (e.g., UUID)
      const newIdentifier = generateUserIdentifier();
      setUserIdentifier(newIdentifier);
      setReFetch(!reFetch);
    } else {
      getNumCartItems(identifier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetch]);

  const [isOpen, setIsOpen] = useState(false);
  console.log('Rendering Navbar');

  return (
    <div className='fixed z-50 bg-white'>
      {/*** Desktop Navbar ***/}
      <div className='relative mx-auto flex w-screen items-center justify-between px-5 py-4 sm:px-10 md:px-16 md:py-8 lg:px-20'>
        {/*** Logo ***/}
        <Link
          href='/'
          className='cursor-pointer'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Image src={logo} alt='logo' priority />
        </Link>
        {/*** Menu ***/}
        <div className='hidden flex-grow items-center justify-evenly px-5 lg:flex'>
          <div className='flex space-x-10 font-medium'>
            <Link
              href={'/female'}
              className='cursor-pointer hover:text-gray-700'
            >
              Female
            </Link>
            <Link href={'/male'} className='cursor-pointer hover:text-gray-700'>
              Male
            </Link>
            <Link href={'/kids'} className='cursor-pointer hover:text-gray-700'>
              Kids
            </Link>
            <Link
              href={'/products'}
              className='cursor-pointer hover:text-gray-700'
            >
              All Products
            </Link>
          </div>
          <div className='flex min-w-[250px] items-center space-x-2 rounded-md border-[1px] border-gray-300 px-1 py-[3px]'>
            <Search size={15} color={'gray'} />
            <input
              type='text'
              placeholder='What you looking for'
              className='flex-grow border-none text-xs outline-none'
            />
          </div>
        </div>
        {/*** Cart ***/}
        <Link
          href={'/cart'}
          className='relative hidden cursor-pointer rounded-full bg-gray-100 p-3 lg:flex'
        >
          <ShoppingCart size={22} />
          {!loading ? (
            <span className='absolute right-1 top-0 rounded-full bg-red-500 px-[6px] py-[2px] text-xs text-white'>
              {dmContext?.cartItems}
            </span>
          ) : (
            <div className='absolute right-1 top-0 rounded-full'>
              <Skeleton className='h-4 w-4 rounded-full bg-red-500' />
            </div>
          )}
        </Link>
        {/*** mbl button ***/}
        <div
          className='block cursor-pointer lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </div>
      </div>
      {/*** Mobile Menu ***/}
      <div
        className={`items-centers absolute flex min-h-screen w-screen flex-col justify-center space-y-5 bg-white text-gray-800 lg:hidden ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        {/*** Cart ***/}
        <Link
          href={'/cart'}
          className='relative mx-auto w-fit rounded-full bg-gray-100 p-3'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <ShoppingCart size={22} />
          {!loading ? (
            <span className='absolute right-1 top-0 rounded-full bg-red-500 px-[6px] py-[2px] text-xs text-white'>
              {dmContext?.cartItems}
            </span>
          ) : (
            <div className='absolute right-1 top-0 rounded-full'>
              <Skeleton className='h-4 w-4 rounded-full bg-red-500' />
            </div>
          )}
        </Link>
        {/*** Menu ***/}
        <div className='flex flex-col space-y-3 text-center font-medium'>
          <Link
            href={'/female'}
            className='hover:text-gray-700'
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Female
          </Link>
          <Link
            href={'/male'}
            className='hover:text-gray-700'
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Male
          </Link>
          <Link
            href={'/kids'}
            className='hover:text-gray-700'
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Kids
          </Link>
          <Link
            href={'/products'}
            className='hover:text-gray-700'
            onClick={() => {
              setIsOpen(false);
            }}
          >
            All Products
          </Link>
        </div>
      </div>
    </div>
  );
};
