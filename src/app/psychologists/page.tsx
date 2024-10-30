'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../components/Button';
import Image from 'next/image';
import fetchData from '@/helpers/fetchData';
import { Psychologist } from '@/interfaces/interfaces';
import PsychologistsList from '../components/PsychologistsList';

interface PsychologistsProps {}

const Psychologists: FC<PsychologistsProps> = () => {
  const [psychologistsArray, setPsychologistsArray] = useState<Psychologist[]>(
    []
  );
  const isFetched = useRef(false);

  useEffect(() => {
    const fetchPsychologists = async () => {
      const data = await fetchData();

      setPsychologistsArray(data as Psychologist[]);
      isFetched.current = true;
    };

    if (!isFetched.current) {
      fetchPsychologists();
    }
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <div>Filters</div>
      <PsychologistsList data={psychologistsArray} />
      <Button background="bg-primary-orange" color="text-primary-white">
        Load more
      </Button>
    </div>
  );
};

export default Psychologists;
