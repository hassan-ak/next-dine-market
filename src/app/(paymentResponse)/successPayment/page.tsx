import { CheckCheck } from 'lucide-react';
import Link from 'next/link';
export default async function SuccessPayment() {

  return (
    <div className='mx-auto flex max-w-[1560px] flex-col space-y-24 px-5 sm:px-10 md:px-16 lg:px-20'>
      <div className='my-2 flex flex-col items-center justify-center space-y-6 rounded-xl bg-[#f1f1f1] px-5 py-10 sm:my-10'>
        <CheckCheck size={150} color={'green'} />
        <p className='text-center text-4xl font-bold text-[#212121]'>
          Thank you for your order!
        </p>
        <p className='text-center'>Check your email inbox for the receipt</p>
        <p className='text-center'>
          If you have any questions, please email{' '}
          <span className='whitespace-nowrap text-red-800'>
            dinemarket@example.com
          </span>
        </p>
        <Link className='' href={'/products'}>
          <button className='cursor-pointer rounded-xl bg-[#212121] px-10 py-2 text-lg font-semibold text-white sm:px-16 lg:px-32'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
