'use client';

import { store } from '@/redux/store';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface AppProps {
  children: ReactNode;
}

const App: FC<AppProps> = ({ children }: AppProps) => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </Provider>
  );
};

export default App;
