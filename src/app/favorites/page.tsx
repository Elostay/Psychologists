'use client';

import { FC, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import Loading from '../loading';

interface FavoritesProps {}

const Favorites: FC<FavoritesProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return router.push('/');
    }
  }, []);

  if (!user) return <Loading />;

  return <div>Favorites</div>;
};

export default Favorites;
