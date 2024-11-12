'use client';
import { FC, useState } from 'react';
import OpenedEye from '../Icons/OpenedEye';
import ClosedEye from '../Icons/ClosedEye';
import X from '../Icons/X';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import Button from '../Button';

interface FormProps {
  header: string;
  text: string;
  onClose?: () => void;
  isRegistration?: boolean;
}

interface Values {
  name?: string;
  email: string;
  password: string;
}
const ModalForm: FC<FormProps> = ({
  header,
  text,
  isRegistration,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const colorTheme = useSelector(selectColorThemeValue);
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const initialValues = isRegistration
    ? { name: '', email: '', password: '' }
    : { email: '', password: '' };

  const schema = yup.object().shape({
    ...(isRegistration && {
      name: yup.string().required('Name is required'),
    }),
    email: yup.string().required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    console.log('💖 ~ handleSubmit ~ values:', values);
    resetForm();
  };

  return (
    <div className="relative p-11">
      <button
        className="absolute right-2 top-3"
        type="button"
        onClick={onClose}
      >
        <X />
      </button>
      <h2 className="font-medium text-[40px] mb-5">{header}</h2>
      <p className="opacity-50 mb-10">{text}</p>

      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          {isRegistration && (
            <div>
              <div className="p-4 border rounded-2xl mb-4">
                <Field
                  type="name"
                  name="name"
                  placeholder="Name"
                  className="outline-none w-full"
                />
              </div>
              <ErrorMessage
                className="text-red-400 pl-2 mb-3 "
                component="div"
                name="name"
              />
            </div>
          )}
          <div className="p-4 border rounded-2xl mb-4">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="outline-none w-full"
            />
          </div>
          <ErrorMessage
            className="text-red-400 pl-2 mb-3 "
            component="div"
            name="email"
          />
          <div className="mb-10">
            <div className="p-4 border rounded-2xl  relative mb-4">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="outline-none w-full"
              />
              <div className="absolute top-1/3 right-5">
                {showPassword ? (
                  <button type="button" onClick={handleShowPassword}>
                    <OpenedEye />
                  </button>
                ) : (
                  <button type="button" onClick={handleShowPassword}>
                    <ClosedEye />
                  </button>
                )}
              </div>
            </div>
            <ErrorMessage
              component="div"
              name="password"
              className="text-red-400 pl-2  "
            />
          </div>
          <Button
            className="w-full"
            color="text-primary-white"
            background={`bg-primary-${colorTheme}`}
            type="submit"
          >
            {isRegistration ? 'Sign up' : 'Log in'}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ModalForm;
