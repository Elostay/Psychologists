'use client';
import clsx from 'clsx';
import { FC } from 'react';
import Button from '../Button';
import { useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { signOut } from 'firebase/auth';

import User from '../Icons/User';
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [user] = useAuthState(auth);

  const colorTheme = useSelector(selectColorThemeValue);

  const router = useRouter();
  const pathname = usePathname();

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
            {user && (
              <div className="flex gap-10">
                <Link
                  href="/"
                  className={clsx(
                    pathname === '/'
                      ? `border-b-8 rounded-lg border-primary-${colorTheme}`
                      : ''
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/psychologists"
                  className={clsx(
                    pathname === '/psychologists'
                      ? `border-b-8 rounded-lg  border-primary-${colorTheme}`
                      : ''
                  )}
                >
                  Psychologists
                </Link>
                <Link
                  href="/favorites"
                  className={clsx(
                    pathname === '/favorites'
                      ? `border-b-8 rounded-lg  border-primary-${colorTheme}`
                      : ''
                  )}
                >
                  Favorites
                </Link>
              </div>
            )}
          </div>

          {!user && (
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
          )}
          {user && (
            <div className="flex gap-7 font-medium items-center">
              <div className="flex gap-3 items-center">
                <div
                  className={clsx(
                    'flex w-10 h-10 p-2 items-center justify-center rounded-xl',
                    `bg-primary-${colorTheme}`
                  )}
                >
                  <User width={16} height={16} fill="black" />
                </div>
                <p className="max-w-48 whitespace-nowrap overflow-hidden">
                  Elostay
                </p>
              </div>
              <Button
                className="outline-none"
                border={true}
                onClick={() => {
                  signOut(auth);
                  router.push('/');
                }}
              >
                Log out
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
