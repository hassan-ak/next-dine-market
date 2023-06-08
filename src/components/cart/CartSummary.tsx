/**
 * Cart Summary
 */
import toast from 'react-hot-toast';
import getStripePromise from '@/lib/stripe';
import { getUserIdentifier } from '@/lib/cookie';
import { CartSummarySkelton } from './CartSummarySkelton';
import React, { useContext, useEffect, useState } from 'react';
import { DineMarketContext } from '@/context/DineMarketContext';

// Component prop types
interface CartSummaryProps {
  bDisabled: boolean;
  setBDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  bDisabled,
  setBDisabled,
}) => {
  const userId = getUserIdentifier() as string;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const dmContext = useContext(DineMarketContext);

  const [qunat, setQuant] = useState(null);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Function to handle interaction with stripe checkout
   */
  async function checkoutHandle() {
    const toastId = toast.loading('trying checkout');
    setBDisabled(true);
    const stripe = await getStripePromise();
    fetch(`${baseUrl}api/checkout`, {
      method: 'POST',
      headers: { Authorization: userId, 'Content-Type': 'application/json' },
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((response) => {
        toast.dismiss(toastId);
        if (response.success === false || !stripe) {
          toast.error('checkout failed');
        } else {
          toast.loading('Redirecting...');
          stripe.redirectToCheckout({ sessionId: response.id });
        }
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error('checkout failed');
        setBDisabled(false);
      });
  }

  /**
   * Function to send get request to get cart summary based on user id
   * get number of items and amount / price
   */
  async function getCartSummary(userId: string) {
    fetch(`${baseUrl}api/cartSummary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userId}`,
      },
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((response) => {
        setQuant(response[0].quant);
        setPrice(response[0].price);
        setLoading(false);
      });
  }

  /**
   * get cart summary when ever component loads
   * re-run if number of items in context change
   */
  useEffect(() => {
    setLoading(true);
    getCartSummary(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dmContext?.cartItems]);

  // returns a skelton when loading
  if (loading) {
    return <CartSummarySkelton />;
  }

  return (
    <div className='flex flex-col items-center justify-center space-y-7 rounded-md bg-gray-100 p-5 text-[#181818]'>
      <p className='w-full text-xl font-bold'>Order Summary</p>
      <p className='inline-flex w-full justify-between text-base font-normal'>
        <span>Quantity</span>
        <span>
          {qunat} {qunat! > 1 ? 'Products' : 'Product'}
        </span>
      </p>
      <p className='inline-flex w-full justify-between text-base font-normal'>
        <span>Sub Total</span>
        <span>${price}</span>
      </p>
      <button
        className={`w-full whitespace-nowrap rounded-md bg-[#212121] px-3 py-2 text-white ${
          !bDisabled
            ? 'cursor-pointer'
            : 'cursor-not-allowed disabled:opacity-50'
        }`}
        onClick={checkoutHandle}
        disabled={bDisabled}
      >
        Process to Checkout
      </button>
    </div>
  );
};
