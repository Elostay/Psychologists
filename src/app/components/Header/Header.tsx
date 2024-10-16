'use client';
import clsx from 'clsx';
import { FC, MouseEvent } from 'react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import { setColorThemeAction } from '@/redux/colorTheme/colorThemeSlice';
interface HeaderProps {}

const colors = ['orange', 'green', 'blue'];
const Header: FC<HeaderProps> = () => {
  const { colorTheme } = useSelector(selectColorThemeValue);
  const dispatch = useDispatch();

  const changeColorTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const color = e.currentTarget.value;

    dispatch(setColorThemeAction(color));
    console.log(color);
  };
  return (
    <header className="flex justify-between items-center">
      <div className="flex gap-[130px] ">
        <p>
          <span className={`text-primary-${colorTheme} `}>psychologists.</span>
          services
        </p>
        <div className="flex gap-10">
          <p>Home</p>
          <p>Psychologists</p>
        </div>
      </div>
      <div>
        <div className="flex gap-5">
          {colors.map(color => (
            <button
              key={color}
              value={color}
              className={clsx(
                'w-5 h-5 rounded-full transition-transform duration-300 ',
                `bg-primary-${color}`,
                colorTheme === color ? 'scale-150' : ''
              )}
              onClick={changeColorTheme}
            ></button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button border={true}>Log In</Button>
        <Button color="text-white" background={`bg-primary-${colorTheme}`}>
          Registration
        </Button>
      </div>
    </header>
  );
};

export default Header;
