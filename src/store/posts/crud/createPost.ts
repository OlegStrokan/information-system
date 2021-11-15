import { addDoc } from 'firebase/firestore';
import { PostType } from '../../../types/post';
import { postsCollection } from '../collection';


export const createPost = async ({title, content}: PostType ): Promise<void> => {
  await addDoc(postsCollection, { title: title, content: content})
}
