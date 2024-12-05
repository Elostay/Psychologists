'use client';

import { auth } from '@/firebaseConfig';
import { getUserById } from '@/api/fetchUser';
import { PsychologistMeeting } from '@/interfaces/interfaces';
import { FC, useEffect, useState } from 'react';
import MeetingsList from '../components/MeetingsList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Loading from '../components/Loading';

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const [meetings, setMeetings] = useState<PsychologistMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = auth.currentUser?.uid;
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        const data = await getUserById(currentUser);
        const meetings = data?.meetings || [];

        setMeetings(meetings);
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/');
    }
  }, [loading]);

  if (!user) return <Loading />;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {meetings.length > 0 ? (
            <div className="container mx-auto p-4">
              <MeetingsList data={meetings} />
            </div>
          ) : (
            <div
              className=" flex items-center justify-center text-3xl font-bold"
              style={{ height: 'calc(100vh - 72.8px)' }}
            >
              Here will be your meetings
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
