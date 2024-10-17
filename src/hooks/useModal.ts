import { useEffect, useState } from 'react';

export interface ModalProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModal = (): ModalProps => {
  const [open, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    open,
    onOpen: handleOpenModal,
    onClose: handleCloseModal,
  };
};

export default useModal;
