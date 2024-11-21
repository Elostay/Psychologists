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
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { getUserById, updateColorTheme } from '@/helpers/fetchUser';
import { setColorThemeAction } from '@/redux/colorTheme/colorThemeSlice';
interface HeaderProps {}

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
  const isSmScreen = useMediaQuery('(min-width: 566px)');

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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isSmScreen ? 566 : 320,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    maxHeight: 860,
    overflow: 'auto',
  };
  return (
    <header className=" p-4 border-b border-gray-300 xs:bg-white">
      <div className="container mx-auto relative z-50">
        <div className="flex justify-center items-center sm:justify-between ">
          <Link href="/" className="hidden sm:block">
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
            <div className="hidden  sm:flex gap-10 items-center">
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
            <div className="flex gap-2 font-medium justify-center items-center">
              <Button
                className="outline-none whitespace-nowrap"
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
                      <p className="max-w-48 whitespace-nowrap overflow-hidden hidden lg:block">
                        {/* {username} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quas, aliquam deleniti! Explicabo repellat est facere
                        enim temporibus qui, autem iusto et quisquam quo cum
                        quas expedita ex doloremque nostrum doloribus. Corporis
                        inventore in fugiat voluptas saepe? Maxime eligendi unde
                        earum optio, tempora repellendus architecto
                        reprehenderit temporibus deserunt dolorem, inventore
                        similique ab, voluptatem hic vel voluptas id laboriosam
                        blanditiis. Dolores, maxime. Iure incidunt repellendus
                        hic odio tempore, cumque impedit illum eos esse
                        veritatis beatae nihil? Quisquam nam quod debitis natus
                        quibusdam, odio quae quasi, id enim voluptas eos,
                        voluptates repellendus ducimus. Voluptatibus
                        perspiciatis nisi vero dignissimos illum corporis
                        expedita in beatae voluptate eligendi voluptatum
                        possimus a eveniet, doloribus ipsum, aspernatur quam est
                        consequatur iste officia tenetur inventore quidem
                        accusantium? Ab, veniam? Natus perspiciatis assumenda,
                        velit accusantium tempore voluptatibus modi ducimus sit
                        libero totam exercitationem porro nisi nihil fuga
                        temporibus magnam sequi in quod voluptates eveniet,
                        quisquam nam aut iste asperiores! Illo. Iusto in
                        laboriosam officiis expedita pariatur ipsum molestiae
                        voluptate deleniti? Officiis placeat esse, consectetur
                        blanditiis, alias libero molestiae rerum quia laborum
                        deserunt officia autem unde perferendis voluptate fugiat
                        dolor quas. Aperiam excepturi blanditiis voluptatum
                        accusamus in labore cupiditate libero fugit commodi
                        deleniti ut necessitatibus totam tempore maiores, sint
                        cumque repudiandae odio dolores! Provident similique
                        recusandae asperiores dolore dignissimos, minus sed. Vel
                        pariatur hic adipisci, accusamus delectus quidem dolorum
                        nostrum excepturi tempore fuga quaerat exercitationem
                        perspiciatis. Placeat quia laudantium nulla rerum
                        necessitatibus. Et sit reprehenderit cumque omnis
                        consequatur, ea impedit quia. Ut, modi voluptatibus?
                        Quas aperiam rem asperiores. Debitis explicabo
                        voluptatibus est distinctio labore animi quidem expedita
                        deleniti, repudiandae quas saepe laborum blanditiis?
                        Deleniti quis nam repellendus voluptatibus vel ipsam
                        animi? Sapiente doloremque nisi aliquid blanditiis est
                        vitae et possimus modi dolorem ratione temporibus dicta
                        ut non asperiores nihil dolor reiciendis fugiat
                        recusandae adipisci, quidem, iure animi sit autem.
                        Sequi, odit?
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
                  <div className="sm:hidden">
                    <MenuItem onClick={handleCloseUserMenu}>
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
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>
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
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
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
                    </MenuItem>
                  </div>
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
