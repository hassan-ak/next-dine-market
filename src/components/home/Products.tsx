import React from 'react';
import { Product } from '../Product';
import { client } from '../../../sanity/lib/client';

import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const getProductData = async () => {
  const res = await client.fetch(
    `*[_type == "product"]|order(_createdAt asc)[0..2]{name,price,image,slug}`
  );
  return res;
};
export default (async function Products() {
  const data = await getProductData();
  return (
    <div className='flex w-full flex-col items-center justify-center space-y-10 pt-6'>
      {/* Title and description */}
      <p className='text-center text-sm font-bold uppercase text-[#0062f5]'>
        PRODUCTS
      </p>
      <p className='text-center text-3xl font-bold text-[##212121]'>
        Check What We Have
      </p>
      <div className='flex w-full items-center justify-around space-x-10 xl:justify-center xl:space-x-0 2xl:space-x-10'>
        <Link href={`./products/${data[0].slug.current}`} className='z-10 transform-gpu cursor-pointer transition-transform duration-500 ease-in-out hover:scale-115'>
          <Product
            name={data[0].name}
            price={data[0].price}
            imgUrl={urlFor(data[0].image[0]).width(400).url()}
            type={''}
            catlog={false}
          />
        </Link>
        <Link href={`./products/${data[1].slug.current}`} className='z-20 hidden transform-gpu cursor-pointer transition-transform duration-500 ease-in-out hover:scale-115 md:block'>
          <Product
            name={data[1].name}
            price={data[1].price}
            imgUrl={urlFor(data[1].image[0]).width(400).url()}
            type={''}
            catlog={false}
          />
        </Link>
        <Link href={`./products/${data[2].slug.current}`} className='z-30 hidden transform-gpu cursor-pointer transition-transform duration-500 ease-in-out hover:scale-110 hover:scale-x-115 xl:block'>
          <Product
            name={data[2].name}
            price={data[2].price}
            imgUrl={urlFor(data[2].image[0]).width(400).url()}
            type={''}
            catlog={false}
          />
        </Link>
      </div>
    </div>
  );
} as unknown as () => JSX.Element);
