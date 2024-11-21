'use client';

import { store } from '@/redux/store';
import { FC, ReactNode, Suspense } from 'react';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorThemeProvider } from '../ColorThemeProvider/ColorThemeProvider';
import Loading from '../Loading';

interface AppProps {
  children: ReactNode;
}
//? blink, screens, add user profile where will show appointment
const App: FC<AppProps> = ({ children }: AppProps) => {
  return (
    <ColorThemeProvider>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
            <ToastContainer />
          </LocalizationProvider>
        </Suspense>
      </Provider>
    </ColorThemeProvider>
  );
};

export default App;
