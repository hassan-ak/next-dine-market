'use client';

import React, { useContext } from 'react';
import { CartEmpty } from './CartEmpty';
import { DineMarketContext } from '@/context/DineMarketContext';
import { CartProduct } from './CartProduct';
import { CartSummary } from './CartSummary';
import { Suspense } from 'react';
import { CartProductSkelton } from './CartProductSkelton';
import { useEffect, useState } from 'react';
import { getUserIdentifier } from '@/lib/cookie';
import { CartSummarySkelton } from './CartSummarySkelton';
import { CartItem } from '@/lib/db/schema';

export const CartCom = () => {
  const dmContext = useContext(DineMarketContext);
  const userId = getUserIdentifier() as string;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [reFetch, setReFetch] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [bDisabled, setBDisabled] = useState(false);


  async function getCartDetail(userId: string) {
    fetch(`${baseUrl}api/cartDetail?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length != 0) {
          setCartItems(response);
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    setLoading(true);
    getCartDetail(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetch]);

  if (dmContext?.cartItems == 0) {
    return <CartEmpty />;
  }

  return (
    <div className='flex flex-col space-y-10 lg:flex-row lg:justify-between lg:space-x-10 lg:space-y-0 xl:space-x-14'>
      <div className='basis-full flex-col space-y-5 lg:basis-4/5 xl:basis-2/3'>
        {loading ? (
          <CartProductSkelton />
        ) : cartItems.length == 0 ? (
          <CartProductSkelton />
        ) : (
          cartItems.map((item) => (
            <CartProduct
              name={item.product_name}
              imgUrl={item.product_image_url}
              type={item.product_type}
              size={item.product_size}
              quantity={item.product_quantity}
              cartId={item.cart_id}
              price={item.product_price}
              key={item.cart_id}
              setReFetch={setReFetch}
              reFetch={reFetch}
              bDisabled={bDisabled}
              setBDisabled={setBDisabled}
            />
          ))
        )}
      </div>
      <div className='basis-full lg:basis-1/5 xl:basis-1/3'>
        <CartSummary bDisabled={bDisabled}
              setBDisabled={setBDisabled}/>
      </div>
    </div>
  );
};
