import { app } from '@/firebaseConfig';
import { useState, useEffect } from 'react';
import {
  getDatabase,
  ref,
  query,
  get,
  orderByKey,
  startAfter,
  limitToFirst,
} from 'firebase/database';
import { Psychologist } from '@/interfaces/interfaces';

const PAGE_SIZE = 5;

const usePaginatedData = () => {
  const [data, setData] = useState<Psychologist[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'psychologists');

    try {
      let psychologistsQuery;
      if (lastKey) {
        psychologistsQuery = query(
          dbRef,
          orderByKey(),
          startAfter(lastKey),
          limitToFirst(PAGE_SIZE)
        );
      } else {
        psychologistsQuery = query(
          dbRef,
          orderByKey(),
          limitToFirst(PAGE_SIZE)
        );
      }

      const snapshot = await get(psychologistsQuery);

      if (snapshot.exists()) {
        const items = Object.entries(snapshot.val()).map(([id, value]) => {
          const { id: _, ...rest } = value as Psychologist;
          return {
            id,
            ...rest,
          };
        });

        if (items.length > 0) {
          setLastKey(items[items.length - 1].id);

          setData(prevData => [...prevData, ...items]);

          setHasMore(items.length === PAGE_SIZE);
        } else {
          setHasMore(false);
        }
      } else {
        console.log('error');
        setHasMore(false);
      }
    } catch (error) {
      console.log('You have not acces to db');
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData();
    };
    fetchDataAsync();
  }, []);

  return { data, fetchData, hasMore };
};

export default usePaginatedData;
