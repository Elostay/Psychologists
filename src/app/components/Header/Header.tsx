'use client';
import clsx from 'clsx';
import { FC, useState, MouseEvent, useEffect } from 'react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { signOut } from 'firebase/auth';
import User from '../Icons/User';
import { Box, IconButton, Menu, MenuItem, Modal, Tooltip } from '@mui/material';
import { getUserById, updateColorTheme } from '@/helpers/fetchUser';
import { setColorThemeAction } from '@/redux/colorTheme/colorThemeSlice';
interface HeaderProps {}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 566,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  maxHeight: 860,
  overflow: 'auto',
};
const colors = ['orange', 'green', 'blue'];

const colorClassMap: { [key: string]: string } = {
  orange: 'bg-primary-orange',
  green: 'bg-primary-green',
  blue: 'bg-primary-blue',
};

const Header: FC<HeaderProps> = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('');

  const [user] = useAuthState(auth);

  const currentUser = auth.currentUser?.uid;

  const colorTheme = useSelector(selectColorThemeValue);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleRegistration = () => {
    router.push('/registration');
  };
  const handleLogIn = () => {
    router.push('/login');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const changeColorTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const color = e.currentTarget.value;
    if (currentUser) updateColorTheme(currentUser, color);
    dispatch(setColorThemeAction(color));
  };

  useEffect(() => {
    const getUserData = async () => {
      if (currentUser) {
        const userData = await getUserById(currentUser);
        const username = userData?.name;

        setUsername(username);
      }
    };
    getUserData();
  }, [currentUser]);

  return (
    <header className=" p-4 border-b border-gray-300">
      <div className="container mx-auto relative z-50">
        <div className="flex justify-between items-center ">
          <Link href="/">
            <span
              className={clsx(
                colorTheme === 'orange' && 'text-primary-orange',
                colorTheme === 'blue' && 'text-primary-blue',
                colorTheme === 'green' && 'text-primary-green'
              )}
            >
              psychologists.
            </span>
            services
          </Link>
          {user && (
            <div className="flex gap-10">
              <Link
                href="/"
                className={clsx(
                  pathname === '/' &&
                    colorTheme === 'orange' &&
                    'border-b-8 rounded-lg  border-primary-orange',
                  pathname === '/' &&
                    colorTheme === 'blue' &&
                    'border-b-8 rounded-lg  border-primary-blue',
                  pathname === '/' &&
                    colorTheme === 'green' &&
                    'border-b-8 rounded-lg  border-primary-green'
                )}
              >
                Home
              </Link>
              <Link
                href="/psychologists"
                className={clsx(
                  pathname === '/psychologists' &&
                    colorTheme === 'orange' &&
                    'border-b-8 rounded-lg  border-primary-orange',
                  pathname === '/psychologists' &&
                    colorTheme === 'blue' &&
                    'border-b-8 rounded-lg  border-primary-blue',
                  pathname === '/psychologists' &&
                    colorTheme === 'green' &&
                    'border-b-8 rounded-lg  border-primary-green'
                )}
              >
                Psychologists
              </Link>
              <Link
                href="/favorites"
                className={clsx(
                  pathname === '/favorites' &&
                    colorTheme === 'orange' &&
                    'border-b-8 rounded-lg  border-primary-orange',
                  pathname === '/favorites' &&
                    colorTheme === 'blue' &&
                    'border-b-8 rounded-lg  border-primary-blue',
                  pathname === '/favorites' &&
                    colorTheme === 'green' &&
                    'border-b-8 rounded-lg  border-primary-green'
                )}
              >
                Favorites
              </Link>
            </div>
          )}

          {!user && (
            <div className="flex gap-2 font-medium ">
              <Button
                className="outline-none"
                border={true}
                onClick={handleLogIn}
              >
                Log In
              </Button>
              <Button
                onClick={handleRegistration}
                color="text-white"
                className="outline-none"
                background={`bg-primary-${colorTheme}`}
              >
                Registration
              </Button>
            </div>
          )}
          {user && (
            <div className="flex gap-7 font-medium items-center">
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <div className="flex gap-3 items-center">
                      <div
                        className={clsx(
                          'flex w-10 h-10 p-2 items-center justify-center rounded-xl',
                          `bg-primary-${colorTheme}`
                        )}
                      >
                        <User width={16} height={16} fill="black" />
                      </div>
                      <p className="max-w-48 whitespace-nowrap overflow-hidden ">
                        {username}
                      </p>
                    </div>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <button type="button" onClick={handleProfileClick}>
                      Profile
                    </button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <button type="button" onClick={() => setOpenModal(true)}>
                      Change color theme
                    </button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      className="outline-none"
                      border={true}
                      onClick={() => {
                        signOut(auth);
                        router.push('/');
                      }}
                    >
                      Log out
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          )}
        </div>
      </div>
      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={style}>
            <div className="flex gap-5 p-6">
              {colors.map(color => (
                <button
                  key={color}
                  value={color}
                  className={clsx(
                    'w-5 h-5 rounded-full transition-transform duration-300 ',
                    colorClassMap[color],
                    colorTheme === color ? 'scale-150' : ''
                  )}
                  onClick={changeColorTheme}
                ></button>
              ))}
            </div>
          </Box>
        </Modal>
      )}
    </header>
  );
};

export default Header;
