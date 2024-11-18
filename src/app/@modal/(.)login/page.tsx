'use client';

import ModalForm from '../../components/Form';
import { useEffect } from 'react';

import CustomModal from '@/app/components/CustomModal';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);
  return (
    <CustomModal>
      <ModalForm
        isRegistration={false}
        header="Log In"
        text="Welcome back! Please enter your credentials to access your account and continue your search for a psychologist."
        isLogin
      />
    </CustomModal>
  );
}
