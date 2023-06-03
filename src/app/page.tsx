import  Products  from '@/components/home/Products';
import { Hero } from '@/components/home/Hero';
import { Newsletter } from '@/components/home/Newsletter';
import { Promotions } from '@/components/home/Promotions';
import { Feature } from '@/components/home/Feature';


export default function Home() {
  return (
    <div className='mx-auto flex max-w-[1560px] flex-col space-y-24 px-5 sm:px-10 md:px-16 lg:px-20'>
      <Hero />
      <Promotions />
      <Products />
      <Feature />
      <Newsletter />
    </div>
  );
}



