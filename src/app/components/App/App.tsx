'use client';

import { store } from '@/redux/store';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

interface AppProps {
  children: ReactNode;
}

const App: FC<AppProps> = ({ children }: AppProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default App;
