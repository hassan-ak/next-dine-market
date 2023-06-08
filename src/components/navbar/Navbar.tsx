'use client';

/**
 * Navbar
 * Desktop + Mobile
 */

import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import logo from '@/../public/logo.png';
import { Skeleton } from '../ui/skeleton';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react';
import { DineMarketContext } from '@/context/DineMarketContext';
import { setUserIdentifier, getUserIdentifier } from '@/lib/cookie';

export const Navbar = () => {
  /**
   * state variables for
   */
  // opening and closing navbar
  const [isOpen, setIsOpen] = useState(false);
  // fetching items data form db in progress
  const [loading, setLoading] = useState(true);
  // to reftch from db
  const [reFetch, setReFetch] = useState(false);

  const dmContext = useContext(DineMarketContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  /**
   * function to execute a GET request for number of items in cart
   * sends userID in the request
   * set number of items in the context variable if found in db otherwise zero
   * finally set loading to false 
   */
  async function getNumCartItems(userId: string) {
    fetch(`${baseUrl}api/numCartItems?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userId}`,
      },
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

  /**
   * this piece of code runs when ever navbar is loaded and then value of refecth changes
   * As navbar is included on top of each and every page so getting number of items from db
   * is a good choice here
   * check for cookies in the browser, if found send get request based on user id from cookie
   * if not set a new cookie and update value of refecth to be exceuted again
   */
  useEffect(() => {
    const identifier = getUserIdentifier();
    if (!identifier) {
      const newIdentifier = uuidv4();
      setUserIdentifier(newIdentifier);
      setReFetch(!reFetch);
    } else {
      getNumCartItems(identifier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetch]);

  return (
    <div className='fixed z-50 bg-white'>
      {/*** Desktop Navbar ***/}
      <div className='relative mx-auto flex w-screen items-center justify-between px-5 py-4 sm:px-10 md:px-16 md:py-8 lg:px-20'>
        {/*** LOGO / Home button ***/}
        <Link
          href='/'
          className='cursor-pointer'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Image src={logo} alt='logo' priority />
        </Link>
        {/*** Menu items for desktop screen***/}
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
        {/*** Cart, displays num of items too ***/}
        {/*** shows skeleton when loading data from db ***/}
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
        {/*** button to open and close mobile menu***/}
        <div
          className='block cursor-pointer lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </div>
      </div>
      {/*** Mobile Menu, closes when-any of the link is clicked***/}
      <div
        className={`items-centers absolute flex min-h-screen w-screen flex-col justify-center space-y-5 bg-white text-gray-800 lg:hidden ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        {/*** Cart for mobile screen ***/}
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
        {/*** Menu on mobile screen ***/}
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
