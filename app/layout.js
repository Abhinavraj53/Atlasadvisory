import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Atlas Advisory - Premium B2B Scrap Marketplace',
  description: 'India\'s premium B2B scrap marketplace by Rareus Private Limited. Connecting sellers with verified buyers for scrap trading, imports, and DRT/NCLT asset deals.',
  keywords: 'scrap marketplace, B2B scrap, import scrap, DRT assets, NCLT deals, metal recycling',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
