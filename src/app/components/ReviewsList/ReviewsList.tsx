import { PsychologistReviews } from '@/interfaces/interfaces';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import Star from '@/app/components/Icons/Star';

interface ReviewsListProps {
  reviews: PsychologistReviews[];
  colorTheme: string;
}

const ReviewsList: FC<ReviewsListProps> = ({ reviews, colorTheme }) => {
  const [avatarBg, setAvatarBg] = useState('secondary-orange');
  const [avatarLetter, setAvatarLetter] = useState('primary-orange');

  useEffect(() => {
    if (colorTheme === 'orange') setAvatarLetter('text-primary-orange');
    if (colorTheme === 'blue') setAvatarLetter('text-primary-blue');
    if (colorTheme === 'green') setAvatarLetter('text-primary-green');
    if (colorTheme === 'orange') setAvatarBg('bg-secondary-orange');
    if (colorTheme === 'blue') setAvatarBg('bg-secondary-blue');
    if (colorTheme === 'green') setAvatarBg('bg-secondary-green');
  }, [colorTheme]);
  return (
    <ul>
      {reviews.map(({ reviewer, rating, comment }) => (
        <li key={reviewer}>
          <div className="flex gap-3 items-center mb-5 mt-5">
            <p
              className={clsx(
                'w-11 h-11 flex justify-center items-center  rounded-full font-semibold',
                avatarBg,
                avatarLetter
              )}
            >
              {reviewer.charAt(0).toUpperCase()}
            </p>
            <div>
              <p className="font-medium">{reviewer}</p>
              <div className="flex items-center gap-2">
                <Star width={16} height={16} />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <p className="opacity-60">{comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default ReviewsList;
