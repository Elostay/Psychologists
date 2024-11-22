'use client';

import {
  useAuthState,
  useSendPasswordResetEmail,
} from 'react-firebase-hooks/auth';
import CustomModal from '@/app/components/CustomModal';
import * as yup from 'yup';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from '@/app/components/Button';
import { Bounce, toast } from 'react-toastify';
import { useTheme } from '@/app/components/ColorThemeProvider/ColorThemeProvider';
import { useEffect } from 'react';

interface ResetPasswordValue {
  email: string;
}
const schemaResetPassword = yup.object().shape({
  email: yup.string().required('Email is required'),
});

export default function ForgotPasswordModal() {
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const colorTheme = useTheme();

  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleResetPassword = async (values: ResetPasswordValue) => {
    const { email } = values;
    try {
      const res = await sendPasswordResetEmail(email);

      if (res) {
        toast.info('Check your email', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        router.push('/');
      } else {
        toast.error('Enter correct email', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, []);
  return (
    <CustomModal>
      <div className=" p-16">
        <h2 className="font-medium text-[40px] mb-5">Forgot password?</h2>
        <p className="opacity-50 mb-10">Enter your email</p>

        <Formik
          validationSchema={schemaResetPassword}
          initialValues={{ email: '' }}
          onSubmit={handleResetPassword}
        >
          <Form autoComplete="off">
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
            <Button
              className="w-full"
              color="text-primary-white"
              background={`bg-primary-${colorTheme}`}
              type="submit"
            >
              Send
            </Button>
          </Form>
        </Formik>
      </div>
    </CustomModal>
  );
}
