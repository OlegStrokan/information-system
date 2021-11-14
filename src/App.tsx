import React from 'react';
import { db, signUp } from './firebase'
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { User } from './types/user';
import { Typography, Card, Box, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import { Login } from './components/Login';

function App() {
  const [users, setUsers] = React.useState<User[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>();



  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    try {
      const data = new FormData(event.currentTarget);
      await signUp(data.get('email') as string, data.get('password') as string);
    }
    catch (e) {
        setError(e)
    }
    setIsLoading(false)
  };

  const usersCollection = collection(db, 'users');

  const getUsers = async () => {
    const data = await getDocs(usersCollection)
    setUsers(data.docs.map((doc) => ({...doc.data() as User, id: doc.id})))
  }

  const createUser = async (email: string, fullName: string, isSubscriber: boolean = false, role: string, userName: string) => {
    await addDoc(usersCollection, { email: email, fullName: fullName, isSubscriber: isSubscriber, role: role, userName: userName})
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
     // createUser('Regina Butenko', false,'student', 'butenko')
    // deleteUser( 'NPgt4BLaPwuIlfAJlCuq')
  },[])

  if (!users) {
    return <div>...loading</div>
  }
  return (
   <div>
     {users.map((user ) => <Card sx={{ p: 2, m: 1 }} key={user.id}>
       <Typography variant="h6">Full name: <b>{user.fullName}</b></Typography>
       <Typography variant="h6">User name: <b>{user.userName}</b></Typography>
       <Typography variant="h6">isSubscriber: <b>{user.isSubscriber ? 'true' : 'false'}</b></Typography>
     </Card>)}
    <Login createUser={createUser}/>
   </div>
  );
}

export default App;
