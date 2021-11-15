import { getDocs } from 'firebase/firestore';
import { UserType } from '../../../types/user';
import { postsCollection } from '../collection';

export const getUsers = async () => {
  const data = await getDocs(postsCollection)
  return data.docs.map((doc) => ({...doc.data() as UserType, id: doc.id}))
}
