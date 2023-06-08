import React from 'react';
import Image from 'next/image';

/**
 * Type defination for product card
 */
interface ProductProps {
  name: string;
  price: string;
  imgUrl: string;
  type: string;
  catlog: boolean;
}

/**
 * Product card
 */
export const Product: React.FC<ProductProps> = ({
  name,
  price,
  imgUrl,
  type,
  catlog,
}) => {
  return (
    <div className=''>
      <div>
        <Image
          src={imgUrl}
          alt={'product'}
          height={600}
          width={600}
          className={`${
            catlog ? 'h-[291px] w-[275px]' : `h-[344px] w-[325px]`
          }  bg-blue-100 object-cover`}
          priority
        />
      </div>
      <h2 className='mt-2 text-lg font-semibold'>{name}</h2>
      {type && (
        <h3 className='text-md mt-1 font-semibold text-gray-500'>${type}</h3>
      )}
      <h4 className='mt-2 text-lg font-semibold'>${price}</h4>
    </div>
  );
};
