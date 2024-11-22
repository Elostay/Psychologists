import { PsychologistMeeting } from '@/interfaces/interfaces';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import Star from '../Icons/Star';
import { useTheme } from '../ColorThemeProvider/ColorThemeProvider';
import AboutPsycholog from '../AboutPsycholog';
import Button from '../Button';

interface MeetingItemProps {
  data: PsychologistMeeting;
  onDelete: (id: string) => void;
}

const MeetingItem: FC<MeetingItemProps> = ({ data, onDelete }) => {
  const {
    psycologName,
    avatar_url,
    price_per_hour,
    rating,
    specialization,
    id,
    meetingTime,
    username,
    comment,
    email,
    phone,
  } = data;

  const colorTheme = useTheme();
  const [moneyColor, setMoneyColor] = useState('text-primary-orange');

  useEffect(() => {
    if (colorTheme === 'orange') setMoneyColor('text-primary-orange');
    if (colorTheme === 'blue') setMoneyColor('text-primary-blue');
    if (colorTheme === 'green') setMoneyColor('text-primary-green');
  }, [colorTheme]);

  const date = new Date(meetingTime ?? '');

  const formattedDate = `${date.getDate()} ${date.toLocaleString('uk-UA', {
    month: 'long',
  })} ${date.getFullYear()}, ${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  return (
    <li className="flex-row lg:flex justify-between gap-10 text-primary-black mb-8 border rounded-xl p-6 bg-white">
      <div className="flex-row lg:flex gap-6">
        <div className=" p-3 border-2 border-secondary-green  rounded-3xl w-[120px] h-[120px] shrink-0">
          <div className="rounded-xl overflow-hidden">
            <Image
              width={'96'}
              height={'96'}
              src={avatar_url}
              alt={'pcycholog photo'}
            />
          </div>
        </div>

        <div className="">
          <div className="md:flex items-center justify-between">
            <p className="opacity-50 font-medium">Psychologist</p>
            <div className="flex gap-4 items-center my-4 md:m-0">
              <div className="flex items-center gap-2">
                <Star width={16} height={16} />
                <p>Rating: {rating}</p>
              </div>
              <p>|</p>
              <div className="flex gap-2">
                Price/1 hour:
                <p className={moneyColor}>{price_per_hour}$</p>
              </div>
            </div>
          </div>
          <p className="font-medium text-2xl">{psycologName}</p>
          <ul className="my-6">
            <li>
              <AboutPsycholog
                category={'Specialization'}
                value={specialization}
              />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p>{formattedDate}</p>
        <p className="text-xl font-bold">{username}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>Your comment:</p>
        <p className="mb-4">{comment}</p>
        <Button
          onClick={() => onDelete(id)}
          background="bg-red-500"
          color="text-white"
        >
          Cancel meeting
        </Button>
      </div>
    </li>
  );
};

export default MeetingItem;
