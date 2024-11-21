import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import Loading from '../Loading';

const ThemeContext = createContext<string | undefined>(undefined);

export const ColorThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('colorTheme') || 'orange';
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem('colorTheme');
      if (newTheme) {
        setTheme(newTheme);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (theme === null) return <Loading />;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};
export const changeTheme = (newTheme: string) => {
  localStorage.setItem('colorTheme', newTheme);
  window.dispatchEvent(new Event('storage'));
};
