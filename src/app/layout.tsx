import './globals.css';
import { Inter } from 'next/font/google';
import App from './components/App';
import Header from './components/Header';
import { ReactNode, Suspense } from 'react';

const interBold = Inter({ weight: '700', subsets: ['latin'] });
const interSemiBold = Inter({ weight: '600', subsets: ['latin'] });
const interMedium = Inter({ weight: '500', subsets: ['latin'] });
const interRegular = Inter({ weight: '400', subsets: ['latin'] });

const fontClasses = [
  interBold.className,
  interSemiBold.className,
  interMedium.className,
  interRegular.className,
].join(' ');

export const metadata = {
  title: 'Psychologists',
  description: 'Service to heal your soul',
  icons: {
    icon: '/favicon.svg',
  },
};

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${fontClasses}  text-primary-black overflow-x-hidden bg-[#f3f3f3]`}
      >
        <App>
          <Header />
          {modal}
          {children}
        </App>
      </body>
    </html>
  );
}
