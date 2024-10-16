import { FC, PropsWithChildren } from 'react';
import ModalLayout from './ModalLayout';
import { ModalProps } from '@/hooks/useModal';

interface ModalComponentProps extends PropsWithChildren<ModalProps> {}

const Modal: FC<ModalComponentProps> = ({ children, ...layoutProps }) => {
  return <ModalLayout {...layoutProps}>{children}</ModalLayout>;
};

export default Modal;
