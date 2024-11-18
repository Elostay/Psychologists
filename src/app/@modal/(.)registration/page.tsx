'use client';

import ModalForm from '../../components/Form';
import * as React from 'react';

import CustomModal from '@/app/components/CustomModal';

export default function RegistrationModal() {
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
