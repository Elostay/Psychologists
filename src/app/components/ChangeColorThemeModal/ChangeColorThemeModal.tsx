import { FC, MouseEvent, useEffect, useState } from 'react';
import Button from '../Button';
import useModal from '@/hooks/useModal';
import { setColorThemeAction } from '@/redux/colorTheme/colorThemeSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import clsx from 'clsx';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';

interface ChangeColorThemeModalProps {}

const colors = ['orange', 'green', 'blue'];

const colorClassMap: { [key: string]: string } = {
  orange: 'bg-primary-orange',
  green: 'bg-primary-green',
  blue: 'bg-primary-blue',
};

const ChangeColorThemeModal: FC<ChangeColorThemeModalProps> = () => {
  const modalProps = useModal();
  const dispatch = useDispatch();
  const colorTheme = useSelector(selectColorThemeValue);
  const changeColorTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const color = e.currentTarget.value;

    dispatch(setColorThemeAction(color));
  };

  return (
    <div>
      <Button
        type="button"
        className="relative z-50 text-primary-white"
        background={`bg-primary-${colorTheme}`}
        onClick={modalProps.onOpen}
      >
        Change color theme
      </Button>
      <Modal {...modalProps}>
        <div className="flex gap-5">
          {colors.map(color => (
            <button
              key={color}
              value={color}
              className={clsx(
                'w-5 h-5 rounded-full transition-transform duration-300 ',
                colorClassMap[color],
                colorTheme === color ? 'scale-150' : ''
              )}
              onClick={changeColorTheme}
            ></button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ChangeColorThemeModal;
