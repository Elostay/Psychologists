'use client';

import { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import Loading from '../loading';
import { getFavorites, getUserById } from '@/helpers/fetchUser';
import PsychologistsList from '../components/PsychologistsList';
import usePaginatedData from '@/helpers/fetchData';
import { Psychologist } from '@/interfaces/interfaces';
import CustomSelect from '../components/CustomSelect';

interface FavoritesProps {}

const Favorites: FC<FavoritesProps> = () => {
  const [favoritesArray, setFavoritesArray] = useState<Psychologist[]>([]);

  const [user] = useAuthState(auth);
  const router = useRouter();
  const currentUser = auth.currentUser?.uid;

  const handleFilter = (filter: string) => {
    switch (filter) {
      case 'a-z':
        const sortedByNameAsc = favoritesArray?.toSorted((a, b) => {
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');

          const nameB = b.name.replace(/^Dr\.?\s+/i, '');
          return nameA.localeCompare(nameB);
        });

        setFavoritesArray(sortedByNameAsc as Psychologist[]);
        break;
      case 'z-a':
        const sortedByNameDesc = favoritesArray?.toSorted((a, b) => {
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');

          const nameB = b.name.replace(/^Dr\.?\s+/i, '');
          return nameB.localeCompare(nameA);
        });

        setFavoritesArray(sortedByNameDesc as Psychologist[]);
        break;
      case 'high-low':
        const sortedByPriceDesc = favoritesArray?.toSorted(
          (a, b) => b.price_per_hour - a.price_per_hour
        );

        setFavoritesArray(sortedByPriceDesc as Psychologist[]);
        break;
      case 'low-hight':
        const sortedByPriceAsc = favoritesArray?.toSorted(
          (a, b) => a.price_per_hour - b.price_per_hour
        );

        setFavoritesArray(sortedByPriceAsc as Psychologist[]);
        break;
      case 'popular':
        const sortedByRatingDesc = favoritesArray?.toSorted(
          (a, b) => b.rating - a.rating
        );

        setFavoritesArray(sortedByRatingDesc as Psychologist[]);
        break;
      case 'unpopular':
        const sortedByRatingAsc = favoritesArray?.toSorted(
          (a, b) => a.rating - b.rating
        );

        setFavoritesArray(sortedByRatingAsc as Psychologist[]);
        break;

      default:
        const sortedByNameAscDefault = favoritesArray?.toSorted((a, b) => {
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');

          const nameB = b.name.replace(/^Dr\.?\s+/i, '');
          return nameA.localeCompare(nameB);
        });

        setFavoritesArray(sortedByNameAscDefault as Psychologist[]);
        break;
    }
  };

  useEffect(() => {
    if (!user) {
      return router.push('/');
    }
    const getUserData = async () => {
      if (currentUser) {
        const userData = await getUserById(currentUser);
        const userFavoritesId = userData?.favorites;

        const favoriteArray = await getFavorites(userFavoritesId);

        setFavoritesArray(favoriteArray);
      }
    };
    getUserData();
  }, []);

  if (!user) return <Loading />;

  return (
    <div>
      {favoritesArray.length > 0 ? (
        <div className="container mx-auto p-4 ">
          <div>
            <p className="mb-2 opacity-50 font-medium">Filters</p>
            <CustomSelect handleFilter={handleFilter} />
          </div>
          <PsychologistsList data={favoritesArray} />
        </div>
      ) : (
        //   <Loading />
        <div>Need to add loading and empty notification</div>
      )}
    </div>
  );
};

export default Favorites;