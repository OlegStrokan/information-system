import React from 'react';
import db from './firebase'
import { collection, onSnapshot } from 'firebase/firestore'
function App() {
  const [users, setUsers] = React.useState<any>();

  React.useEffect(() => {
      onSnapshot(collection(db, 'users'),(snapshot) => {
        setUsers(snapshot.docs.map((doc) => doc.data()))
      })
  },[])

  if (!users) {
    return <div>...loading</div>
  }
  return (
   <div>
     {users.map((user: any) => <div key={user.id}>{user.title}</div>)}
   </div>
  );
}

export default App;
