/** 
 * Static pages for the categoris
 * page is just the list of image cards for a particular category
*/

import { Key } from 'react';
import Link from 'next/link';
import NotFound from '../not-found';
import { Product } from '@/components/Product';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';


/**
 * generate static params (fixeds)
 */
export async function generateStaticParams() {
  const categories: string[] = ['female', 'male', 'kids'];
  return categories.map((category) => ({
    category: category,
  }));
}

/**
 * function to capatalize first leter of the input params
 * to be used for staic params to match category on sanity
 */
function makeSearchParam(params: string) {
  return params.charAt(0).toUpperCase() + params.slice(1);
}

/**
 * function to get data from sanity based on category
*/
const getProductData = async (param: string) => {
  const res = await client.fetch(
    `*[_type == "product" && category == "${makeSearchParam(
      param
    )}"]{name,price,image,slug,type}`
  );
  return res;
};



export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const data = await getProductData(params.category);
  if (data.length == 0) {
    return <NotFound />;
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
