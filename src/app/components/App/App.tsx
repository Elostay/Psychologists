'use client';

import { store } from '@/redux/store';
import { FC, ReactNode, Suspense } from 'react';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Loading from '@/app/loading';

interface AppProps {
  children: ReactNode;
}

const App: FC<AppProps> = ({ children }: AppProps) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </Suspense>
    </Provider>
  );
};

export default App;
