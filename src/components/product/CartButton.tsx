'use client';
import React, { useContext, useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { getUserIdentifier } from '@/lib/cookie';
import toast, { Toaster } from 'react-hot-toast';
import { DineMarketContext } from '@/context/DineMarketContext';

interface CartButtonProps {
  name: string;
  type: string;
  slug: string;
  imageUrl: string;
  price: string;
}

export const CartButton: React.FC<CartButtonProps> = ({
  name,
  type,
  slug,
  imageUrl,
  price,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const [sizeIndex, setSizeIndex] = useState(2);
  const [selectedSize, setSelectedSize] = useState(sizes[sizeIndex]);
  const [quantity, setQuantity] = useState(1);
  const identifier = getUserIdentifier();
  const dmContext = useContext(DineMarketContext);
  const [bDisabled, setBDisabled] = useState(false);

  async function addToCart() {
    const toastId = toast.loading('adding to cart');
    setBDisabled(true);
    fetch(`${baseUrl}api/addToCart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: name,
        productType: type,
        productSlug: slug,
        productImageUrl: imageUrl,
        productSelectedSize: selectedSize,
        productQuantity: quantity,
        productPrice: price,
        userId: identifier,
      }),
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);

        if (response[0].product_quantity) {
          dmContext?.incCartItems(quantity);
          toast.success('added to cart');
        } else {
          toast.error('adding to cart failed');
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error('adding to cart failed');
      })
      .finally(() => {
        setBDisabled(false);
      });
  }

  return (
    <div className='flex flex-col space-y-8 text-[#212121]'>
      <div className='flex flex-col space-y-3'>
        <p className='text-sm font-semibold'>SELECT SIZE</p>
        <div className='flex flex-wrap gap-5'>
          {sizes.map((size, ind) => (
            <p
              key={ind}
              className={`w-10 cursor-pointer rounded-full p-2 text-center ${
                sizeIndex == ind ? 'bg-[#212121] text-white' : 'bg-gray-200'
              }`}
              onClick={() => {
                setSizeIndex(ind);
                setSelectedSize(size);
              }}
            >
              {size}
            </p>
          ))}
        </div>
      </div>
      <div className='flex items-center space-x-5'>
        <p className='text-sm font-semibold'>Quantity</p>
        <div className='inline-flex items-center justify-between space-x-3'>
          <span
            className={`w-fitt cursor-pointer rounded-full bg-gray-200 p-2 text-center`}
            onClick={() => {
              quantity > 1 && setQuantity(quantity - 1);
            }}
          >
            <Minus size={15} color={'gray'} />
          </span>
          <span className='w-10 text-center'>{quantity}</span>
          <span
            className={`w-fitt cursor-pointer rounded-full bg-gray-200 p-2 text-center`}
            onClick={() => {
              quantity < 26 && setQuantity(quantity + 1);
            }}
          >
            <Plus size={15} color={'gray'} />
          </span>
        </div>
      </div>
      <div className='flex items-center space-x-5'>
        <p className='text-sm font-semibold'>Total : </p>
        <p className='text-lg font-semibold'>
          ${parseInt(price) * quantity}.00
        </p>
      </div>
      <div className='flex items-center space-x-5'>
        <Button
          className={`w-fitt inline-flex space-x-2 bg-[#212121] px-8 py-4 focus-visible:bg-[#212121] ${
            !bDisabled
              ? 'cursor-pointer'
              : 'cursor-not-allowed disabled:opacity-50'
          }`}
          onClick={addToCart}
          disabled={bDisabled}
        >
          <ShoppingCart size={20} />
          <span className='whitespace-nowrap'>Add to Cart</span>
        </Button>
      </div>
      <Toaster position='top-center' />
    </div>
  );
};
