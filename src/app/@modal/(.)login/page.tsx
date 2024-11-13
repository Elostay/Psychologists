'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ModalForm from '../../components/Form';
import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 566,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
};

export default function RegistrationModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    router.back();
  };
  const router = useRouter();
  useEffect(() => {
    handleOpen();
  }, []);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <ModalForm
          onClose={handleClose}
          header="Log In"
          text="Welcome back! Please enter your credentials to access your account and continue your search for a psychologist."
        />
      </Box>
    </Modal>
  );
}

