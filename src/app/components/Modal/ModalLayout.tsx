import { ModalProps } from '@/hooks/useModal';
import { FC, PropsWithChildren } from 'react';
import Portal from '../Portal';
import clsx from 'clsx';

interface ModalLayoutProps extends PropsWithChildren<ModalProps> {
  className: string;
}

const ModalLayout: FC<ModalLayoutProps> = ({
  onClose,
  children,
  open,
  className,
}) => {
  if (!open) return null;
  return (
    <Portal target="modals-root">
      <div
        onClick={onClose}
        className={clsx(
          'fixed inset-0 flex items-center justify-center h-screen w-screen bg-black bg-opacity-50 z-50 '
        )}
      >
        <div
          onClick={e => e.stopPropagation()}
          className={clsx('bg-white p-5 rounded-lg shadow-xl ', className)}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default ModalLayout;
