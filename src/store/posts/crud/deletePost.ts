import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

export const deletePost = async (id: string) => {
  await deleteDoc(doc(db,'users', id))
}
