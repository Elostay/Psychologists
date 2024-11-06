'use client';

import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import { FC, useEffect, useState } from 'react';
import { Hearts } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  const colorTheme = useSelector(selectColorThemeValue);

  const [heartColor, setHeartColor] = useState('#FC832C');

  useEffect(() => {
    switch (colorTheme) {
      case 'orange':
        setHeartColor('#FC832C');
        break;
      case 'green':
        setHeartColor('#54be96');
        break;
      case 'blue':
        setHeartColor('#3470ff');
        break;
      default:
        break;
    }
  }, []);
  return (
    <div className=" flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-50 ">
      <Hearts
        height="80"
        width="80"
        color={heartColor}
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
