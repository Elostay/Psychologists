'use client';

import { PsychologistMeeting } from '@/interfaces/interfaces';
import { FC, useEffect, useState } from 'react';
import MeetingItem from '../MeetingItem';
import Loading from '../Loading';
import { auth } from '@/firebaseConfig';
import { deleteMeeting } from '@/helpers/fetchUser';
import { Bounce, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface MeetingListProps {
  data: PsychologistMeeting[];
}

const MeetingsList: FC<MeetingListProps> = ({ data }) => {
  const [meetings, setMeetings] = useState<PsychologistMeeting[]>(data);

  const currentUser = auth.currentUser?.uid;
  const router = useRouter();

  const handleCancelMeeting = async (id: string) => {
    if (currentUser) {
      setMeetings(prevMeetings => {
        const filteredMeetings = prevMeetings.filter(
          meeting => meeting.id !== id
        );
        if (filteredMeetings.length === 0) router.push('/psychologists');

        return filteredMeetings;
      });
      await deleteMeeting(currentUser, id);

      toast.info('Meeting was canceled', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    setMeetings(data);
  }, [data]);

  return (
    <ul>
      {data ? (
        meetings.map((meeting: PsychologistMeeting) => (
          <MeetingItem
            key={meeting.meetingTime}
            data={meeting}
            onDelete={handleCancelMeeting}
          />
        ))
      ) : (
        <Loading />
      )}
    </ul>
  );
};

export default MeetingsList;
