'use client';

import ModalForm from '../../components/Form';
import * as React from 'react';

import CustomModal from '@/app/components/CustomModal';

export default function LoginModal() {
  return (
    <CustomModal>
      <ModalForm
        header="Log In"
        text="Welcome back! Please enter your credentials to access your account and continue your search for a psychologist."
      />
    </CustomModal>
  );
}
