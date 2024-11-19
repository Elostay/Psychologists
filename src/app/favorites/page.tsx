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

interface FavoritesProps {}

const Favorites: FC<FavoritesProps> = () => {
  const [favoritesArray, setFavoritesArray] = useState<Psychologist[]>([]);

  const [user] = useAuthState(auth);
  const router = useRouter();
  const currentUser = auth.currentUser?.uid;

  //   const { data, fetchData, hasMore } = usePaginatedData();
  //   const loadMore = () => {
  //     if (hasMore) {
  //       fetchData();
  //     }
  //   };

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
          {/* <div>
            <p className="mb-2 opacity-50 font-medium">Filters</p>
            <CustomSelect handleFilter={handleFilter} />
          </div> */}
          <PsychologistsList data={favoritesArray} />
          {/* <div className="flex justify-center">
            {hasMore && (
              <Button
                background={`bg-primary-${colorTheme}`}
                color="text-primary-white"
                onClick={loadMore}
              >
                Load more
              </Button>
            )}
          </div> */}
        </div>
      ) : (
        //   <Loading />
        <div>Need to add loading and empty notification</div>
      )}
    </div>
  );
};

export default Favorites;
