import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import BookList from '../../components/BookList/BookList';


const Home = ({user,setUser}) => {
  return (
    <main>
        <Header user={user} setUser={setUser} />
        <BookList/>
        <Outlet />
        
    </main>
  )
}

export default Home
