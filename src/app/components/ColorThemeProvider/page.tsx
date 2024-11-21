import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

interface ColorThemeProviderProps extends PropsWithChildren {}

const ColorThemeProvider: FC<ColorThemeProviderProps> = ({ children }) => {
  const colorTheme = useSelector(selectColorThemeValue);
  return <div>{children}</div>;
};

export default ColorThemeProvider;
