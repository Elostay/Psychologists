'use client';
import { FC, useEffect, useState } from 'react';
import { Psychologist } from '@/interfaces/interfaces';
import Image from 'next/image';
import Star from '@/app/components/Icons/Star';
import Heart from '@/app/components/Icons/Heart';
import AboutPsycholog from '../AboutPsycholog';
import ReviewsList from '../ReviewsList';
import Button from '@/app/components/Button';
import { usePathname, useRouter } from 'next/navigation';
import { getUserById, toggleFavorite } from '@/api/fetchUser';
import { auth } from '@/firebaseConfig';
import { useTheme } from '../ColorThemeProvider/ColorThemeProvider';

interface PsychologistItemProps {
  data: Psychologist;
}

const PsychologistItem: FC<PsychologistItemProps> = ({ data }) => {
  const colorTheme = useTheme();
  const [moneyColor, setMoneyColor] = useState('text-primary-orange');
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartColor, setHeartColor] = useState('#FC832C');
  const [isReadMore, setIsReadMore] = useState(false);

  const currentUser = auth.currentUser?.uid;

  const router = useRouter();

  useEffect(() => {
    if (colorTheme === 'orange') setMoneyColor('text-primary-orange');
    if (colorTheme === 'blue') setMoneyColor('text-primary-blue');
    if (colorTheme === 'green') setMoneyColor('text-primary-green');
    if (colorTheme === 'orange') setHeartColor('#FC832C');
    if (colorTheme === 'blue') setHeartColor('#3470ff');
    if (colorTheme === 'green') setHeartColor('#54be96');
  }, [colorTheme]);

  const {
    name,
    avatar_url,
    experience,
    reviews,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
    id,
  } = data;

  const handleFavorite = async () => {
    setIsFavorite(prev => !prev);
    if (currentUser) toggleFavorite(currentUser, id);
  };

  const handleReadMore = () => {
    setIsReadMore(true);
  };

  const handleOpenModal = () => {
    router.push(
      `/meeting/${id}?name=${name}&avatar_url=${avatar_url}&price_per_hour=${price_per_hour}&rating=${rating}&specialization=${specialization}&id=${id}`
    );
  };

  useEffect(() => {
    const getFavorites = async () => {
      if (currentUser) {
        const data = await getUserById(currentUser);
        if (data?.favorites) {
          const favorite = data?.favorites.includes(id);
          if (favorite) setIsFavorite(favorite);
        }
      }
    };
    getFavorites();
  }, []);

  return (
    <li className="flex-row sm:flex gap-6 text-primary-black mb-8 border rounded-xl p-6 bg-white">
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

      <div>
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
            <button type="button" onClick={handleFavorite}>
              {
                <Heart
                  width={26}
                  height={26}
                  fill={isFavorite ? heartColor : 'none'}
                  stroke={isFavorite ? 'none' : null}
                />
              }
            </button>
          </div>
        </div>
        <p className="font-medium text-2xl">{name}</p>
        <ul className="my-6">
          <li>
            <AboutPsycholog category={'Experience'} value={experience} />
            <AboutPsycholog category={'License'} value={license} />
          </li>
          <li>
            <AboutPsycholog
              category={'Specialization'}
              value={specialization}
            />
            <AboutPsycholog
              category={'Initial consultation'}
              value={initial_consultation}
            />
          </li>
        </ul>
        <div>
          <p className="opacity-60 mb-4">{about}</p>
          {!isReadMore && (
            <button
              type="button"
              onClick={handleReadMore}
              className="underline"
            >
              Read more
            </button>
          )}
        </div>
        {isReadMore && (
          <div className="mt-12">
            <ReviewsList reviews={reviews} colorTheme={colorTheme} />
            <Button
              onClick={handleOpenModal}
              className="mt-10"
              color="text-white"
              background={`bg-primary-${colorTheme}`}
            >
              Make an appointment
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default PsychologistItem;
