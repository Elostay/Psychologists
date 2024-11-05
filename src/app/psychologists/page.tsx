'use client';

import {
  ChangeEvent,
  FC,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Button from '../components/Button';
import Image from 'next/image';
import fetchData from '@/helpers/fetchData';
import { Psychologist } from '@/interfaces/interfaces';
import PsychologistsList from '../components/PsychologistsList';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectColorThemeValue } from '@/redux/colorTheme/selectors';
import CustomSelect from '../components/CustomSelect';

interface PsychologistsProps {}

const query = {
  sortBy: 'name',
  order: 'asc',
  limit: 5,
  lastValue: null,
};

const Psychologists: FC<PsychologistsProps> = () => {
  const colorTheme = useSelector(selectColorThemeValue);

  const [psychologistsArray, setPsychologistsArray] = useState<Psychologist[]>(
    []
  );

  const isFetched = useRef(false);

  const handleFilter = (filter: string) => {
    switch (filter) {
      case 'a-z':
        const sortedByNameAsc = psychologistsArray?.toSorted((a, b) => {
          //@ts-ignore
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');
          //@ts-ignore
          const nameB = b.name.replace(/^Dr\.?\s+/i, '');
          return nameA.localeCompare(nameB);
        });

        setPsychologistsArray(sortedByNameAsc as Psychologist[]);
        break;
      case 'z-a':
        const sortedByNameDesc = psychologistsArray?.toSorted((a, b) => {
          //@ts-ignore
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');
          //@ts-ignore
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
          //@ts-ignore
          const nameA = a.name.replace(/^Dr\.?\s+/i, '');
          //@ts-ignore
          const nameB = b.name.replace(/^Dr\.?\s+/i, '');
          return nameA.localeCompare(nameB);
        });

        setPsychologistsArray(sortedByNameAscDefault as Psychologist[]);
        break;
    }
  };

  useEffect(() => {
    const fetchPsychologists = async () => {
      const data = await fetchData();
      const sortedData = data?.sort((a, b) => {
        //@ts-ignore
        const nameA = a.name.replace(/^Dr\.?\s+/i, '');
        //@ts-ignore
        const nameB = b.name.replace(/^Dr\.?\s+/i, '');
        return nameA.localeCompare(nameB);
      });

      setPsychologistsArray(sortedData as Psychologist[]);
      isFetched.current = true;
    };

    if (!isFetched.current) {
      fetchPsychologists();
    }
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <div>
        <p className="mb-2 opacity-50 font-medium">Filters</p>
        {/* <div className="relative">
          <select
            className={clsx(
              'py-3 px-5 mb-8 rounded-3xl text-primary-white outline-none',
              colorTheme === 'orange' && 'bg-primary-orange',
              colorTheme === 'green' && 'bg-primary-green',
              colorTheme === 'blue' && 'bg-primary-blue'
            )}
            onChange={handleFilter}
            name="filter"
            id="filter"
          >
            <option
              className="bg-primary-white text-black opacity-50 rounded-3xl mt-9"
              value="a-z"
            >
              A to Z
            </option>
            <option
              className="bg-primary-white text-black opacity-50"
              value="z-a"
            >
              Z to A
            </option>
            <option
              className="bg-primary-white text-black opacity-50"
              value="high-low"
            >
              High-Low Price
            </option>
            <option
              className="bg-primary-white text-black opacity-50"
              value="low-hight"
            >
              Low-High Price
            </option>
            <option
              className="bg-primary-white text-black opacity-50"
              value="popular"
            >
              Popular
            </option>
            <option
              className="bg-primary-white text-black opacity-50"
              value="unpopular"
            >
              Not popular
            </option>
          </select>
          <div className="absolute top-3 left-28 pointer-events-none ">
            <ChevronDown />
          </div>
        </div> */}
        <CustomSelect handleFilter={handleFilter} />
      </div>
      <PsychologistsList data={psychologistsArray} />
      <div className="flex justify-center">
        <Button background="bg-primary-orange" color="text-primary-white">
          Load more
        </Button>
      </div>
    </div>
  );
};

export default Psychologists;
