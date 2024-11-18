'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import X from '../Icons/X';

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
interface CustomModalProps extends React.PropsWithChildren {}

const CustomModal: React.FC<CustomModalProps> = ({ children }) => {
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
        <div className="relative">
          <button
            className="absolute right-5 top-5"
            type="button"
            onClick={handleClose}
          >
            <X />
          </button>
          {children}
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
