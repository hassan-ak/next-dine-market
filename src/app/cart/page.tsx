import { CartCom } from '@/components/cart/CartCom';

export default async function Cart() {
  return (
    <div className='mx-auto mt-6 flex max-w-[1560px] flex-col space-y-12 px-5 sm:px-10 md:px-16 lg:px-20'>
      <div className='text-left text-3xl font-bold text-[#212121]'>
        Shopping Cart
      </div>
      <div>
        <CartCom />
      </div>
    </div>
  );
}
