'use client';
import clsx from 'clsx';
import { FC, MouseEvent } from 'react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import { setColorThemeAction } from '@/redux/colorTheme/colorThemeSlice';
import Link from 'next/link';
interface HeaderProps {}

const colors = ['orange', 'green', 'blue'];

const colorClassMap: { [key: string]: string } = {
  orange: 'bg-primary-orange',
  green: 'bg-primary-green',
  blue: 'bg-primary-blue',
};

const Header: FC<HeaderProps> = () => {
  const colorTheme = useSelector(selectColorThemeValue);
  const dispatch = useDispatch();

  const changeColorTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const color = e.currentTarget.value;

    dispatch(setColorThemeAction(color));
  };

  return (
    <header className="container mx-auto p-4 relative z-50">
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

        <div className="flex gap-5">
          {colors.map(color => (
            <button
              key={color}
              value={color}
              className={clsx(
                'w-5 h-5 rounded-full transition-transform duration-300 ',
                colorClassMap[color],
                colorTheme === color ? 'scale-150' : ''
              )}
              onClick={changeColorTheme}
            ></button>
          ))}
        </div>

        <div className="flex gap-2 font-medium">
          <Button border={true}>Log In</Button>
          <Button color="text-white" background={`bg-primary-${colorTheme}`}>
            Registration
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
