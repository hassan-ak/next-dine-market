'use client';

/**
 * Complete Cart Component
 */

import { CartEmpty } from './CartEmpty';
import React, { useContext } from 'react';
import { CartItem } from '@/lib/db/schema';
import { CartProduct } from './CartProduct';
import { CartSummary } from './CartSummary';
import { useEffect, useState } from 'react';
import { getUserIdentifier } from '@/lib/cookie';
import { CartProductSkelton } from './CartProductSkelton';
import { DineMarketContext } from '@/context/DineMarketContext';

export const CartCom = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const dmContext = useContext(DineMarketContext);
  const userId = getUserIdentifier() as string;
  /**
   * State variables
   */
  const [loading, setLoading] = useState(true);
  const [reFetch, setReFetch] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [bDisabled, setBDisabled] = useState(false);

  /**
   * Get cart details based on user ID
   * set these values in respective state variable
   * finally set loaind to false
   */
  async function getCartDetail(userId: string) {
    fetch(`${baseUrl}api/cartDetail`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userId}`,
      },
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.length != 0) {
          setCartItems(response);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Fetch cart details on load and then every time reFetch updates
  useEffect(() => {
    setLoading(true);
    getCartDetail(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetch]);

  // When no items in cart return a empty cart comaponet
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
        <CartSummary bDisabled={bDisabled} setBDisabled={setBDisabled} />
      </div>
    </div>
  );
};
