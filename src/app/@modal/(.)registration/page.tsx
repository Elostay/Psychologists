'use client';

import ModalForm from '../../components/Form';
import { useEffect } from 'react';

import CustomModal from '@/app/components/CustomModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebaseConfig';

export default function RegistrationModal() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
   
      router.replace('/');
    }
  }, []);

  return (
    <CustomModal>
      <ModalForm
        isLogin={false}
        header="Registration"
        text="Thank you for your interest in our platform! Please provide the following information to register."
        isRegistration
      />
    </CustomModal>
  );
}
