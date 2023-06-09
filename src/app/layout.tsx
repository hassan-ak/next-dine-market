import './globals.css';
import { sora } from '@/styles/fonts';
import { ClerkProvider } from '@clerk/nextjs'
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { DineMarketContextProvider } from '@/context/DineMarketContext';

export const metadata = {
  title: 'Dine Market',
  description: 'Ecommerce Clothing Web',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${sora.className} overflow-x-hidden bg-white`}>
        <div className='flex min-h-screen flex-col'>
          <ClerkProvider>
            <DineMarketContextProvider>
              <Navbar />
              <div className='mt-14 flex-grow py-4 md:mt-[88px] md:py-8 lg:mt-[110px]'>
                {children}
              </div>
              <Footer />
            </DineMarketContextProvider>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
}
