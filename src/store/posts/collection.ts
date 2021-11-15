import { collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const postsCollection = collection(db, 'posts');
