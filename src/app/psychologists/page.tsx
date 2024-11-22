'use client';

import { FC, useEffect, useState } from 'react';
import Button from '../components/Button';
import { Psychologist } from '@/interfaces/interfaces';
import PsychologistsList from '../components/PsychologistsList';
import CustomSelect from '../components/CustomSelect';
import Loading from '../components/Loading/Loading';
import usePaginatedData from '@/helpers/fetchData';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useTheme } from '../components/ColorThemeProvider/ColorThemeProvider';
interface PsychologistsProps {}

const Psychologists: FC<PsychologistsProps> = () => {
  const [psychologistsArray, setPsychologistsArray] = useState<Psychologist[]>(
    []
  );
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const colorTheme = useTheme();

  const { data, fetchData, hasMore } = usePaginatedData();
  const loadMore = () => {
    if (hasMore) {
      fetchData();
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/');
    }
    setPsychologistsArray(data);
  }, [data, loading]);

  const handleFilter = (filter: string) => {
    switch (filter) {
      case 'a-z':
        const sortedByNameAsc = psychologistsArray?.toSorted((a, b) => {
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');

          const nameB = b.name.replace(/^Dr\.?\s+/i, '');
          return nameA.localeCompare(nameB);
        });

        setPsychologistsArray(sortedByNameAsc as Psychologist[]);
        break;
      case 'z-a':
        const sortedByNameDesc = psychologistsArray?.toSorted((a, b) => {
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');

          const nameB = b.name.replace(/^Dr\.?\s+/i, '');
          return nameB.localeCompare(nameA);
        });

        setPsychologistsArray(sortedByNameDesc as Psychologist[]);
        break;
      case 'high-low':
        const sortedByPriceDesc = psychologistsArray?.toSorted(
          (a, b) => b.price_per_hour - a.price_per_hour
        );

        setPsychologistsArray(sortedByPriceDesc as Psychologist[]);
        break;
      case 'low-hight':
        const sortedByPriceAsc = psychologistsArray?.toSorted(
          (a, b) => a.price_per_hour - b.price_per_hour
        );

        setPsychologistsArray(sortedByPriceAsc as Psychologist[]);
        break;
      case 'popular':
        const sortedByRatingDesc = psychologistsArray?.toSorted(
          (a, b) => b.rating - a.rating
        );

        setPsychologistsArray(sortedByRatingDesc as Psychologist[]);
        break;
      case 'unpopular':
        const sortedByRatingAsc = psychologistsArray?.toSorted(
          (a, b) => a.rating - b.rating
        );

        setPsychologistsArray(sortedByRatingAsc as Psychologist[]);
        break;

      default:
        const sortedByNameAscDefault = psychologistsArray?.toSorted((a, b) => {
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');

          const nameB = b.name.replace(/^Dr\.?\s+/i, '');
          return nameA.localeCompare(nameB);
        });

        setPsychologistsArray(sortedByNameAscDefault as Psychologist[]);
        break;
    }
  };
  if (!user) return <Loading />;
  return (
    <>
      {psychologistsArray.length > 0 ? (
        <div className="container mx-auto p-4 ">
          <div>
            <p className="mb-2 opacity-50 font-medium">Filters</p>
            <CustomSelect handleFilter={handleFilter} />
          </div>
          <PsychologistsList data={psychologistsArray} />
          <div className="flex justify-center">
            {hasMore && (
              <Button
                background={`bg-primary-${colorTheme}`}
                color="text-primary-white"
                onClick={loadMore}
              >
                Load more
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Psychologists;
