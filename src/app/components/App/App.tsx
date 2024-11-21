'use client';

import { store } from '@/redux/store';
import { FC, ReactNode, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorThemeProvider } from '../ColorThemeProvider/ColorThemeProvider';
import Loading from '../Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';

interface AppProps {
  children: ReactNode;
}
//?  add user profile where will show appointment
const App: FC<AppProps> = ({ children }: AppProps) => {
  const [user, loading] = useAuthState(auth);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      setContentLoaded(true);
    }
  }, [loading, user]);

  if (!contentLoaded) {
    return <Loading />;
  }
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
