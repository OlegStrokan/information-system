import React from 'react';
import { Card } from '@mui/material';
import { Login } from './components/Login';
import { Link, Route, Routes } from 'react-router-dom';
import { Posts } from './components/Posts';

function App() {

  return (
   <Card>
     <ul>
       <li>
         <Link to="/">Home</Link>
       </li>
       <li>
         <Link to="/login">login</Link>
       </li>
       <li>
         <Link to="/posts">posts</Link>
       </li>
     </ul>

      <Routes>
     <Route path='/login' element={<Login/>}/>
     <Route path='/posts' element={<Posts/>}/>
      </Routes>
   </Card>

  );
}

export default App;
