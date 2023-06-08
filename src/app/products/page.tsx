/**
 * Prodcuts page
 * list all projects
 */

import { Key } from 'react';
import Link from 'next/link';
import { Product } from '@/components/Product';
import NoProducts from '@/components/NoProducts';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';

/**
 * function to get products data from sanity
*/
const getProductData = async () => {
  const res = await client.fetch(
    `*[_type == "product"]{name,price,image,slug,type}`
  );
  return res;
};

export default async function Products() {
  const data = await getProductData();
  // Empty page when no products on sanity
  if (data.length == 0) {
    return <NoProducts />;
  }
  return (
    <div className='mx-auto flex max-w-[1560px] flex-wrap justify-center gap-5 px-5 py-12 sm:px-10 md:px-16 lg:px-20'>
      {data.map((prod: any, ind: Key | null | undefined) => (
        <Link
          href={`/products/${prod.slug.current}`}
          className='cursor-pointer'
          key={ind}
        >
          <Product
            name={prod.name}
            price={prod.price}
            imgUrl={urlForImage(prod.image[0]).width(400).url()}
            type={prod.type}
            catlog={true}
          />
        </Link>
      ))}
    </div>
  );
}
