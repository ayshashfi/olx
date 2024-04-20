import './App.css';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './store/Context';
import { auth } from './firebase/config';
import { onAuthStateChanged } from "firebase/auth";

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import LoginPage from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Post from './store/PostContext';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home /> 
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/create',
    element: <Create />
  },
  {
    path: "/view",
    element: <ViewPost />
  }
])

function App() {

  const {setUser} = useContext(AuthContext)


  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  })

  return (
    <div>
    <Post>
      <RouterProvider router={router} />
    </Post>
    </div>
  );
}

export default App;
