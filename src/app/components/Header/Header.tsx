'use client';
import clsx from 'clsx';
import { FC } from 'react';
import Button from '../Button';
import { useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const colorTheme = useSelector(selectColorThemeValue);

  const router = useRouter();

  const handleRegistration = () => {
    router.push('/registration');
  };
  const handleLogIn = () => {
    router.push('/login');
  };

  return (
    <header className=" p-4 border-b border-gray-300">
      <div className="container mx-auto relative z-50">
        <div className="flex justify-between items-center ">
          <div className="flex gap-[130px] ">
            <Link href="/">
              <span
                className={clsx(
                  colorTheme === 'orange' && 'text-primary-orange',
                  colorTheme === 'blue' && 'text-primary-blue',
                  colorTheme === 'green' && 'text-primary-green'
                )}
              >
                psychologists.
              </span>
              services
            </Link>
            <div className="flex gap-10">
              <Link href="/">Home</Link>
              <Link href="/psychologists">Psychologists</Link>
            </div>
          </div>

          <div className="flex gap-2 font-medium ">
            <Button
              className="outline-none"
              border={true}
              onClick={handleLogIn}
            >
              Log In
            </Button>
            <Button
              onClick={handleRegistration}
              color="text-white"
              className="outline-none"
              background={`bg-primary-${colorTheme}`}
            >
              Registration
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
