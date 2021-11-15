import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { PostType } from '../../../types/post';

export const updatePost = async ({ id, title, content}: PostType) => {
  const userDoc = doc(db, 'users', id);
  const newField = {title: title, content: content}
  await updateDoc(userDoc, newField )
}
