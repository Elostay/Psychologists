'use client';
import clsx from 'clsx';
import { FC, useState } from 'react';
import Button from '../Button';
import { useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import Link from 'next/link';
import Modal from '../Modal';
import useModal from '@/hooks/useModal';
import ModalForm from '../Form';
interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const colorTheme = useSelector(selectColorThemeValue);
  const modalProps = useModal();

  const [isRegistration, setIsRegistration] = useState(false);

  const handleRegistration = () => {
    modalProps.onOpen();
    setIsRegistration(true);
  };

  const handleLogIn = () => {
    modalProps.onOpen();
    setIsRegistration(false);
  };

  return (
    <header className=" p-4 border-b border-gray-300">
      <div className="container mx-auto relative z-50">
        <div className="flex justify-between items-center ">
          <div className="flex gap-[130px] ">
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
            <div className="flex gap-10">
              <Link href="/">Home</Link>
              <Link href="/psychologists">Psychologists</Link>
            </div>
          </div>

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
        </div>
      </div>
      {modalProps.open && (
        <Modal {...modalProps}>
          {isRegistration ? (
            <ModalForm
              header={'Registration'}
              text={
                'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'
              }
              onClose={modalProps.onClose}
              isRegistration
            />
          ) : (
            <ModalForm
              header={'Log In'}
              text={
                'Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.'
              }
              onClose={modalProps.onClose}
            />
          )}
        </Modal>
      )}
    </header>
  );
};

export default Header;
