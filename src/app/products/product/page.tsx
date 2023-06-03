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

const getProductData = async () => {
  const res = await client.fetch(
    `*[_type == "product" && slug.current=="cameryn-sash-tie-dress"]{name,type,image,price,details,care}`
  );
  return res;
};

export default async function Product() {
  let imagesUrls: string[] = [];
  let productDetails: string[] = [];
  let careDetails: string[] = [];


  const data = {
    name: 'Cameryn Sash Tie Dress',
    type: 'Dress',
    image: [
      'https://cdn.sanity.io/images/dow10h3v/production/ffc858fc182553bee2aaff34fe728bf07d15f2b5-278x296.png',
      'https://cdn.sanity.io/images/dow10h3v/production/678c1dd51d26380191c9eef7f59e852522491f78-134x143.png',
      'https://cdn.sanity.io/images/dow10h3v/production/fad703737467ff104a7224f38aaac61c29d5ce52-134x143.png',
      'https://cdn.sanity.io/images/dow10h3v/production/1ddb566e73b9bc57c94e66196f6c2d818f894668-134x143.png',
    ],
    price: '125',
    details: [
      {
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          },
        ],
      },
      {
        children: [
          {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          },
        ],
      },
    ],
    care: [
      {
        children: [
          {
            text: 'Lorem ipsum dolor sit amet',
          },
        ],
      },
      {
        children: [
          {
            text: 'Lorem ipsum dolor sit amet',
          },
        ],
      },
    ],
  };

  const slug = 'cameryn-sash-tie-dress';

  // const prod = await getProductData();
  // const data = prod[0];
  data.image.map((url: string) => {
    imagesUrls.push(urlFor(url).width(700).url());
  });
  data.details.map((detail: { children: { text: string; }[]; }) => {
    productDetails.push(detail.children[0].text);
  });
  data.care.map((item: { children: { text: string; }[]; }) => {
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
            slug={slug}
            imageUrl={imagesUrls[0]}
            price={data.price}
          />
        </div>
      </div>
      {/* Bottom */}
      <Overview detail={productDetails} care = {careDetails}/>
    </div>
  );
}
