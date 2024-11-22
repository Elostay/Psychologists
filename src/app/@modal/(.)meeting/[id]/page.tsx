'use client';

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import CustomModal from '@/app/components/CustomModal';
import Image from 'next/image';
import Button from '@/app/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';
import { useTheme } from '@/app/components/ColorThemeProvider/ColorThemeProvider';
import { auth } from '@/firebaseConfig';
import { createMeetings } from '@/helpers/fetchUser';

interface Values {
  name: string;
  phone: string;
  email: string;
  comment: string;
  meetingTime: string | null;
}
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
  meetingTime: yup
    .date()
    .min(new Date(), 'Choose a future meeting time')
    .required('Choose meeting time'),
  email: yup.string().required('Email is required'),
  comment: yup.string(),
});

const initialValues: Values = {
  name: '',
  meetingTime: null,
  phone: '',
  email: '',
  comment: '',
};

export default function MeetingModal() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const avatar_url = searchParams.get('avatar_url');
  const price_per_hour = searchParams.get('price_per_hour');
  const rating = searchParams.get('rating');
  const specialization = searchParams.get('specialization');
  const psycologId = searchParams.get('id');

  const currentUser = auth.currentUser?.uid;

  const colorTheme = useTheme();
  const router = useRouter();

  const handleSubmit = async (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ) => {
    toast.success('Appointment registration is successful', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    });
    const { meetingTime, comment, email, name: username, phone } = values;

    const convertedMeetingTime = meetingTime?.toString();

    const psychologist = {
      psycologName: name,
      avatar_url: avatar_url || '',
      price_per_hour,
      rating,
      specialization,
      id: psycologId || '',
      meetingTime: convertedMeetingTime,
      username,
      comment,
      email,
      phone,
    };

    if (currentUser) await createMeetings(currentUser, psychologist);
    router.back();
    resetForm();
  };

  return (
    <CustomModal>
      <div className=" p-11 ">
        <h2 className="mb-5 text-4xl font-medium max-w-[430px]">
          Make an appointment with a psychologists
        </h2>
        <p className="opacity-50 mb-10">
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        <div className="flex gap-4 mb-10">
          <div className="rounded-3xl overflow-hidden">
            {avatar_url && (
              <Image
                width={'60'}
                height={'60'}
                src={avatar_url}
                alt={'pcycholog photo'}
              />
            )}
          </div>
          <div>
            <p className="mb-1 opacity-50">Your psychologists</p>
            <p className="font-semibold ">{name}</p>
          </div>
        </div>

        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form>
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

            <div className="flex gap-2">
              <div>
                <div className="p-4 border rounded-2xl mb-4">
                  <Field
                    type="number"
                    name="phone"
                    placeholder="Phone number"
                    className="outline-none w-full"
                  />
                </div>
                <ErrorMessage
                  className="text-red-400 pl-2 mb-3 "
                  component="div"
                  name="phone"
                />
              </div>

              <div>
                <Field name="meetingTime">
                  {({ field, form }: any) => (
                    <DateTimePicker
                      {...field}
                      disablePast
                      label="Meeting time"
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }}
                      onChange={newValue =>
                        form.setFieldValue(field.name, newValue)
                      }
                      value={field.value}
                    />
                  )}
                </Field>
                <ErrorMessage
                  className="text-red-400 pl-2 mt-4"
                  component="div"
                  name="meetingTime"
                />
              </div>
            </div>
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
            <div className="p-4 border rounded-2xl mb-4">
              <Field
                as="textarea"
                type="text"
                name="comment"
                placeholder="Comment"
                className="outline-none w-full"
              />
            </div>
            <ErrorMessage
              className="text-red-400 pl-2 mb-3 "
              component="div"
              name="comment"
            />
            <Button
              type="submit"
              background={`bg-primary-${colorTheme}`}
              className="w-full "
              color="text-primary-white"
            >
              Send
            </Button>
          </Form>
        </Formik>
      </div>
    </CustomModal>
  );
}
