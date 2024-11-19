import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom'
import './index.css';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Logout from './pages/Logout/Logout';
import Books from './components/Books/Books';
import Footer from './components/Footer/Footer';
import Review from './components/Reviews/Review';
import Navbar from './components/Navbar/Navbar';



 function App(){
    const [user, setUser] = useState(null) 
    
    useEffect(() => {
        fetch("/me").then((response) => {
          if (response.ok) {
            response.json().then((user) => setUser(user));
          }
        });
      }, []);
    

    return (
        <BrowserRouter>
            <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path = "/" element = {<Home user={user} setUser={setUser} />}/>
          <Route path = "about" element = {<About />} />
          <Route path = "books" element = {<Books user={user} setUser={setUser}/>} />
          {/* <Route path = "books" element = {<BookList />} /> */}
          <Route path = "/book/:id" element = {<BookDetails />} />
          <Route path='/login' element={<Login user={user} setUser={setUser}/>} />
          <Route path='/signup' element={<Signup user={user} setUser={setUser} />}/>
          <Route path='/logout' element={<Logout user={user} setUser={setUser}/>}/>
          <Route path = "/reviews" element = {<Review user={user} setUser={setUser} />} />

      
      </Routes>
    </BrowserRouter>
    )
 }

 export default App