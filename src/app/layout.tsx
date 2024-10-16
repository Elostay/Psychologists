import './globals.css';
import { Inter } from 'next/font/google';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontClasses}>{children}</body>
    </html>
  );
}
