'use client';

import { auth } from '@/firebaseConfig';
import { getUserById } from '@/helpers/fetchUser';
import { PsychologistMeeting } from '@/interfaces/interfaces';
import { FC, useEffect, useState } from 'react';
import MeetingsList from '../components/MeetingsList';

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const [meetings, setMeetings] = useState<PsychologistMeeting[]>([]);
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        const data = await getUserById(currentUser);
        const meetings = data?.meetings;

        setMeetings(meetings);
      }
    };
    fetchUserInfo();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <MeetingsList data={meetings} />
    </div>
  );
};

export default Profile;
