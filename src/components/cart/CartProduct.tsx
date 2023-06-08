/**
 * products on cart page
 */

import Image from 'next/image';
import { getUserIdentifier } from '@/lib/cookie';
import { Trash2, Minus, Plus } from 'lucide-react';
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { DineMarketContext } from '@/context/DineMarketContext';

// Component prop type
interface CartProductProps {
  name: string;
  imgUrl: string;
  type: string;
  size: string;
  quantity: number;
  price: number;
  cartId: number;
  setReFetch: React.Dispatch<React.SetStateAction<boolean>>;
  reFetch: boolean;
  bDisabled: boolean;
  setBDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartProduct: React.FC<CartProductProps> = ({
  name,
  imgUrl,
  type,
  size,
  price,
  quantity,
  cartId,
  reFetch,
  setReFetch,
  bDisabled,
  setBDisabled,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const userId = getUserIdentifier() as string;
  const [quantOriginal, setQuantOriginal] = useState(quantity);
  const [quantUpdated, setQuantUpdated] = useState(quantOriginal);

  const dmContext = useContext(DineMarketContext);

  async function onUpdateHandle() {
    const toastId = toast.loading('updating cart');
    setBDisabled(true);
    fetch(`${baseUrl}api/cartDetail`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        cartId: cartId,
        productQuantity: quantUpdated,
      }),
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);
        if (response.length != 0 && response[0].updatedQuantity) {
          dmContext?.decCartItems(quantOriginal - quantUpdated);
          setQuantOriginal(response[0].updatedQuantity);
          setQuantUpdated(response[0].updatedQuantity);
          toast.success('cart updated');
        } else {
          toast.error('update failed');
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error('update failed');
      })
      .finally(() => {
        setBDisabled(false);
      });
  }

  async function onDeleteHandle() {
    setBDisabled(true);
    const toastId = toast.loading('deleting order');
    fetch(`${baseUrl}api/cartDetail`, {
      method: 'DELETE',
      headers: { Authorization: userId, cartId: cartId.toString() },
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);

        if (response.response == 'success') {
          dmContext?.decCartItems(quantOriginal);
          setReFetch(!reFetch);
          toast.success('corder deleted');
        } else {
          toast.error('delete failed');
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error('delete failed');
      })
      .finally(() => {
        setBDisabled(false);
      });
  }

  return (
    <div className='flex flex-col space-y-10 rounded-md bg-gray-50 p-5 sm:flex-row sm:items-stretch sm:space-x-10 sm:space-y-0'>
      <div className='flex flex-row justify-between sm:basis-1/3'>
        <div className='w-fit overflow-hidden rounded-xl bg-blue-100'>
          <Image
            src={imgUrl}
            alt=''
            width={200}
            height={200}
            className='h-[133px] w-[125px] object-cover custom1:h-[160px] custom1:w-[150px] sm:h-[187px] sm:w-[175px]'
          ></Image>
        </div>
        <div className='inline-flex flex-col items-end justify-between sm:hidden'>
          <button
            disabled={bDisabled}
            onClick={onDeleteHandle}
            className={`${
              !bDisabled
                ? 'cursor-pointer'
                : 'cursor-not-allowed disabled:opacity-50'
            }`}
          >
            <Trash2 size={25} />
          </button>
          {quantOriginal != quantUpdated && (
            <button
              className={`rounded-md bg-green-800 px-2 py-[2px] text-white ${
                !bDisabled
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed disabled:opacity-50'
              }`}
              onClick={onUpdateHandle}
              disabled={bDisabled}
            >
              Update
            </button>
          )}
        </div>
      </div>
      <div className='flex flex-col space-y-3 sm:basis-2/3 sm:justify-between sm:space-y-0'>
        <div className='text-xl font-medium sm:flex sm:items-center sm:justify-between sm:space-x-5'>
          <span>{name}</span>
          <button
            className={`hidden sm:block ${
              !bDisabled
                ? 'cursor-pointer'
                : 'cursor-not-allowed disabled:opacity-50'
            }`}
            disabled={bDisabled}
            onClick={onDeleteHandle}
          >
            <Trash2 size={25} />
          </button>
        </div>
        <p className='inline-flex space-x-5 text-base font-semibold text-[#666]'>
          <span>{type}</span>
          <span>({size})</span>
        </p>
        <p className='text-base font-semibold'>Delivery Estimation</p>
        <div className='h-[26px] text-base font-semibold text-[#ffc700] sm:flex sm:items-center sm:justify-between sm:space-x-5'>
          <span>5 Working Days</span>
          {quantOriginal != quantUpdated && (
            <button
              onClick={onUpdateHandle}
              className={`hidden rounded-md bg-green-800 px-2 py-[2px] font-normal text-white sm:block ${
                !bDisabled
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed disabled:opacity-50'
              }`}
              disabled={bDisabled}
            >
              Update
            </button>
          )}
        </div>
        <p className='inline-flex items-center justify-between'>
          <span className='text-lg font-bold'>${price * quantUpdated}</span>
          <span className='inline-flex items-center justify-between space-x-1'>
            <span
              className={`w-fitt cursor-pointer rounded-full bg-gray-200 p-2 text-center`}
              onClick={() => {
                quantUpdated > 1 && setQuantUpdated(quantUpdated - 1);
              }}
            >
              <Minus size={15} color={'gray'} />
            </span>
            <span className='w-10 text-center'>{quantUpdated}</span>
            <span
              className={`w-fitt cursor-pointer rounded-full bg-gray-200 p-2 text-center`}
              onClick={() => {
                quantUpdated < 26 && setQuantUpdated(quantUpdated + 1);
              }}
            >
              <Plus size={15} color={'gray'} />
            </span>
          </span>
        </p>
      </div>
      <Toaster position='top-center' />
    </div>
  );
};
