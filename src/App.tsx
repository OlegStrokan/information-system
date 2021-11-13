import React from 'react';
import { db } from './firebase'
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

function App() {
  const [users, setUsers] = React.useState<any>();

  const usersCollection = collection(db, 'users');

  const getUsers = async () => {
    const data = await getDocs(usersCollection)
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  const createUser = async ( fullName: string, role: string) => {
    await addDoc(usersCollection, { fullName: fullName, role: role})
  }

  const updateUser = async (id: string, fullName: string, role: string) => {
    const userDoc = doc(db, 'users', id);
    const newField = {fullName: fullName, role: role}
    await updateDoc(userDoc, newField )
  }

  const deleteUser = async (id: string) => {
    const userDoc = doc(db,'users', id);
    await deleteDoc(userDoc)
  }

  React.useEffect(() => {
      getUsers()
    // updateUser('12lRW2n0ZIKpajcAu4P6', 'Oleh Strokan', 'admin')
    // createUser('Regina Butenko', 'student')
    // deleteUser( 'NPgt4BLaPwuIlfAJlCuq')
  },[])

  if (!users) {
    return <div>...loading</div>
  }
  return (
   <div>
     {users.map((user: any) => <div key={user.id}>{user.id}</div>)}
   </div>
  );
}

export default App;
