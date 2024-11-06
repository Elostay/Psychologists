import app from '@/firebaseConfig';
// import { getDatabase, ref, get } from 'firebase/database';

// const fetchData = async () => {
//   const db = getDatabase(app);
//   const dbRef = ref(db, 'psychologists');
//   const snapshot = await get(dbRef);

//   if (snapshot.exists()) {
//     return Object.values(snapshot.val());
//   } else {
//     console.log('error');
//   }
// };

// export default fetchData;
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
  //   const [data, setData] = useState([]);
  //   const [lastKey, setLastKey] = useState(null);
  //   const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<Psychologist[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'psychologists');

    let psychologistsQuery;
    if (lastKey) {
      psychologistsQuery = query(
        dbRef,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(PAGE_SIZE)
      );
    } else {
      psychologistsQuery = query(dbRef, orderByKey(), limitToFirst(PAGE_SIZE));
    }

    const snapshot = await get(psychologistsQuery);
    if (snapshot.exists()) {
      const items = Object.entries(snapshot.val()).map(([id, value]) => ({
        id, //@ts-ignore
        ...value,
      }));

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
