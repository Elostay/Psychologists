'use client';

import { store } from '@/redux/store';
import { FC, ReactNode, Suspense } from 'react';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Loading from '@/app/loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ColorThemeProvider from '../ColorThemeProvider';
interface AppProps {
  children: ReactNode;
}
//? blink, screens, add user profile where will show appointment, fix color theme
const App: FC<AppProps> = ({ children }: AppProps) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ColorThemeProvider>{children}</ColorThemeProvider>
          <ToastContainer />
        </LocalizationProvider>
      </Suspense>
    </Provider>
  );
};

export default App;
