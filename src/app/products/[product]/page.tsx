import { CartButton } from '@/components/product/CartButton';
import { ImageSection } from '@/components/product/ImageSection';
import { Title } from '@/components/product/Title';

import React from 'react';
import { client } from '@/../sanity/lib/client';

import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Link from 'next/link';
import { Overview } from '@/components/product/Overview';

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const getProductData = async (slug: string) => {
  const res = await client.fetch(
    `*[_type == "product" && slug.current=="${slug}"]{name,type,image,price,details,care}`
  );
  return res;
};

const getProductSlug = async () => {
  const res = await client.fetch(`*[_type == "product"]{slug}`);
  return res;
};

//**************************//
//* Generate Static params *//
//**************************//
export async function generateStaticParams() {
  let res = await getProductSlug();
  let productSlugs: string[] = [];
  res.map((prod: { slug: { current: string } }) => {
    productSlugs.push(prod.slug.current);
  });
  return productSlugs.map((slug) => ({
    product: slug,
  }));
}

export default async function Product({
  params,
}: {
  params: { product: string };
}) {
  let imagesUrls: string[] = [];
  let productDetails: string[] = [];
  let careDetails: string[] = [];


  const prod = await getProductData(params.product);
  const data = prod[0];
  data.image.map((url: string) => {
    imagesUrls.push(urlFor(url).width(700).url());
  });
  data.details.map((detail: { children: { text: string }[] }) => {
    productDetails.push(detail.children[0].text);
  });
  data.care.map((item: { children: { text: string }[] }) => {
    careDetails.push(item.children[0].text);
  });

  return (
    <div className='mx-auto flex max-w-[1560px] flex-wrap justify-center gap-5 rounded-xl bg-[#f3f3f35d] px-5 py-12 sm:px-10 md:px-16 lg:px-20'>
      {/* Top */}
      <div className=' flex w-full flex-col items-start space-y-8 md:flex-row md:space-x-7 md:space-y-0 lg:space-x-10'>
        {/* Title */}
        <div className='hidden w-full custom1:block md:hidden'>
          <Title title={data.name} type={data.type} />
        </div>
        {/* Image */}
        <div className='w-full basis-8/12'>
          <ImageSection urls={imagesUrls} />
        </div>
        {/* Title + Add to Cart */}
        <div className='w-full basis-full space-y-12 md:basis-4/12'>
          <div className='block custom1:hidden md:block md:pt-16'>
            <Title title={data.name} type={data.type} />
          </div>
          <CartButton
            name={data.name}
            type={data.type}
            slug={params.product}
            imageUrl={imagesUrls[0]}
            price={data.price}
          />
        </div>
      </div>
      {/* Bottom */}
      <Overview detail={productDetails} care={careDetails} />
    </div>
  );
}
