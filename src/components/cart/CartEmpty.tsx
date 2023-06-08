/** 
 * Empty cart componet 
 * to be displayed when no items in the cart
*/
import React from 'react'
import { ShoppingBag } from 'lucide-react';


export const CartEmpty = () => {
  return (
    <div className='flex flex-col items-center justify-center mb-6'>
      <ShoppingBag size={150} />
      <p className='text-2xl font-bold text-[#212121] mt-6'>
        Your shopping bag is empty
      </p>
    </div>
  )
}
