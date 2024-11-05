import app from '@/firebaseConfig';
import { Psychologist } from '@/interfaces/interfaces';
import { getDatabase, ref, get } from 'firebase/database';

const fetchData = async () => {
  const db = getDatabase(app);
  const dbRef = ref(db, 'psychologists');
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    console.log('error');
  }
};

export default fetchData;
// import {
//   getDatabase,
//   ref,
//   query,
//   orderByChild,
//   limitToFirst,
//   startAt,
//   get,
//   startAfter,
//   limitToLast,
// } from 'firebase/database';

// interface FetchData {
//   sortBy: string;
//   order: string;
//   limit: number;
//   lastValue: number | null;
// }
// const fetchData = async ({
//   startValue = null,
//   sortBy = 'rating',
// }: FetchData) => {
//   const db = getDatabase(app);
//   const dbRef = ref(db, 'psychologists');

//   // Запит з лімітом
//   let dbQuery = query(dbRef, orderByChild(sortBy), limitToFirst(2));

//   // Якщо це не перший запит, додайте `startAt`
//   if (startValue !== null) {
//     dbQuery = query(
//       dbRef,
//       orderByChild(sortBy),
//       startAt(startValue),
//       limitToFirst(2)
//     );
//   }

//   const snapshot = await get(dbQuery);

//   if (snapshot.exists()) {
//     return Object.values(snapshot.val());
//   } else {
//     console.log('No more data');
//   }
// };
// const fetchData = async ({
//   sortBy = 'name',
//   order = 'asc',
//   limit = 2,
//   lastValue = null,
// }: FetchData) => {
//   const db = getDatabase(app);
//   const dbRef = ref(db, 'psychologists');
//   let queryRef;
//   console.log(sortBy);
//   if (sortBy && order) {
//     // Запит із сортуванням та пагінацією
//     queryRef =
//       order === 'asc'
//         ? query(
//             dbRef,
//             orderByChild(sortBy),
//             startAfter(lastValue || 0),
//             limitToFirst(limit)
//           )
//         : query(
//             dbRef,
//             orderByChild(sortBy),
//             startAfter(lastValue || 0),
//             limitToLast(limit)
//           );
//   } else {
//     // Запит без сортування, але з пагінацією
//     queryRef = query(dbRef, limitToFirst(limit));
//   }

//   const snapshot = await get(queryRef);

//   if (snapshot.exists()) {
//     //  const data = Object.values(snapshot.val());
//     const data: Psychologist[] = Object.values(
//       snapshot.val() as Record<string, Psychologist>
//     );
//     if (sortBy === 'name') {
//       if (order === 'asc') {
//         data.sort((a: Psychologist, b: Psychologist) => {
//           const nameA = a.name.replace(/Dr\.?\s+/i, '');
//           const nameB = b.name.replace(/Dr\.?\s+/i, '');
//           return nameA.localeCompare(nameB);
//         });
//       } else {
//         data.sort((a: Psychologist, b: Psychologist) => {
//           const nameA = a.name.replace(/Dr\.?\s+/i, '');
//           const nameB = b.name.replace(/Dr\.?\s+/i, '');
//           return nameB.localeCompare(nameA);
//         });
//       }
//     }
//     return data;
//   } else {
//     console.log('error');
//     return [];
//   }
// };
// export default fetchData;
