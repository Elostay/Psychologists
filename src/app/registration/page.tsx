'use client';
import ModalForm from '@/app/components/Form';

export default function RegistrationPage() {
  return (
    <ModalForm
      header="Registration"
      text="Thank you for your interest in our platform! Please provide the following information to register."
      isRegistration
    />
  );
}
