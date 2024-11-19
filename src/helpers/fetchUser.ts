import { db } from '@/firebaseConfig';
import { child, get, getDatabase, ref } from 'firebase/database';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

const getUserById = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No such user');
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
  }
};

const toggleFavorite = async (currentUser: string, psycologistId: string) => {
  if (currentUser) {
    try {
      const userDocRef = doc(db, 'users', currentUser);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const favorites = userData?.favorites || [];
        if (favorites.includes(psycologistId)) {
          await updateDoc(userDocRef, {
            favorites: arrayRemove(psycologistId),
          });
        } else {
          await updateDoc(userDocRef, {
            favorites: arrayUnion(psycologistId),
          });
        }
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }
};

const getFavorites = async (psychologistIds: string[]) => {
  const dbRealtime = getDatabase();
  const psychologistsRef = ref(dbRealtime, 'psychologists');
  try {
    const promises = psychologistIds.map(async id => {
      const snapshot = await get(child(psychologistsRef, id));
      return snapshot.exists() ? { id, ...snapshot.val() } : null;
    });

    const psychologists = (await Promise.all(promises)).filter(
      data => data !== null
    );

    return psychologists;
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    throw error;
  }
};

export { getUserById, toggleFavorite, getFavorites };
