import { Product } from '@/components/Product';
import { client } from '../../../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';
import NotFound from '../not-found';
import { Key } from 'react';

export async function generateStaticParams() {
  const categories: string[] = ['female', 'male', 'kids'];

  return categories.map((category) => ({
    category: category,
  }));
}

function makeSearchParam(params: string) {
  return params.charAt(0).toUpperCase() + params.slice(1);
}

const getProductData = async (param: string) => {
  const res = await client.fetch(
    `*[_type == "product" && category == "${makeSearchParam(
      param
    )}"]{name,price,image,slug,type}`
  );
  return res;
};

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default async function GiveName({
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
            imgUrl={urlFor(prod.image[0]).width(400).url()}
            type={prod.type}
            catlog={true}
          />
        </Link>
      ))}
    </div>
  );
}
