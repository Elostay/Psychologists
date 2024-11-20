'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import CheckMark from './components/Icons/CheckMark';
import People from './components/Icons/People';
import { auth } from '@/firebaseConfig';
import { getColorTheme } from '@/helpers/fetchUser';
import { setColorThemeAction } from '@/redux/colorTheme/colorThemeSlice';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const currentUser = auth.currentUser?.uid;
  const dispatch = useDispatch();

  const colorTheme = useSelector(selectColorThemeValue);
  const [checkMarkColor, setCheckMarkColor] = useState('#FC832C');

  useEffect(() => {
    if (colorTheme === 'orange') setCheckMarkColor('#FC832C');
    if (colorTheme === 'blue') setCheckMarkColor('#3470ff');
    if (colorTheme === 'green') setCheckMarkColor('#54be96');
  }, [colorTheme]);

  useEffect(() => {
    const fetchColorTheme = async () => {
      if (currentUser) {
        const colorThemeData = await getColorTheme(currentUser);
        dispatch(setColorThemeAction(colorThemeData));
      }
    };

    fetchColorTheme();
  }, [currentUser]);
  return (
    <main className="container mx-auto p-4 ">
      <div className="-tracking-0.02 flex justify-between items-center pt-[102px] relative z-50">
        <div className="max-w-[595px]">
          <h1 className="font-semibold text-[80px] leading-102 ">
            The road to the
            <span
              className={clsx(
                'italic',
                colorTheme === 'orange' && 'text-primary-orange',
                colorTheme === 'blue' && 'text-primary-blue',
                colorTheme === 'green' && 'text-primary-green'
              )}
            >
              depths
            </span>
            of the human soul
          </h1>
          <p className="font-medium text-lg leading-133 max-w-[510px] mt-5 mb-10">
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
        </div>
        <div className="relative">
          <Image
            className="rounded-xl overflow-hidden"
            src="/images/woman@1.jpg"
            alt="woman with glasses"
            width={464}
            height={526}
            priority
          />
          <div className="w-[59px] h-[59px] rounded-[18px] bg-yellow flex items-center justify-center absolute top-9 -right-10 rotate-12">
            <People fill="#FBFBFB" width={25} height={25} />
          </div>
          <div
            className={clsx(
              'w-[40px] h-[40px] rounded-[10px]  text-primary-white text-xl flex items-center justify-center absolute top-48 -left-6 -rotate-12',
              colorTheme === 'green' ? 'bg-violet' : 'bg-primary-green'
            )}
          >
            ?
          </div>
          <div
            className={clsx(
              'p-8 rounded-[20px] flex gap-4 max-w-[311px] max-h-[118px] absolute bottom-16 -left-32',
              colorTheme === 'orange' && 'bg-primary-orange',
              colorTheme === 'blue' && 'bg-primary-blue',
              colorTheme === 'green' && 'bg-primary-green'
            )}
          >
            <div className="bg-white p-4 rounded-xl flex items-center ">
              <CheckMark fill={checkMarkColor} />
            </div>
            <div>
              <p className="text-sm text-[#FBFBFB80]">
                Experienced psychologists
              </p>
              <p className="font-bold text-2xl text-primary-white">15,000</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'h-full absolute bottom-0 right-0 w-full z-0',
          colorTheme === 'orange' && 'bg-orange-gradient',
          colorTheme === 'blue' && 'bg-blue-gradient',
          colorTheme === 'green' && 'bg-green-gradient'
        )}
      ></div>

      {/* <ChangeColorThemeModal /> */}
    </main>
  );
};

export default Home;
