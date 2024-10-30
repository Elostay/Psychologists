import app from '@/firebaseConfig';
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
