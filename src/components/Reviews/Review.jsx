import {useLocation} from 'react-router-dom'
import { useEffect } from "react";
import { useState } from "react";
import './Review.css'
import Login from '../../pages/Login/Login';
import ReviewCard from './ReviewCard';

function Review({ user, setUser }){
    const [book, setBook] = useState(null)
    const location = useLocation()
    const [bookReviews, setBookReviews] = useState(null)
    const {book_id} = location.state
    const [comment, setComment] = useState(null)

    useEffect(() => {
          fetch(`/books/${book_id}`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
                setBook(data)
                setBookReviews(data.reviews)
                console.log(bookReviews);
            })
            
           
      }, []);
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(comment);
        console.log("this button was clicked");
        const submittedReview = {
          book_id: book_id,
          user_id: user.id,
          comment: comment
        }
        const response = await fetch(`/reviews`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(submittedReview)
        })
        const returnedData = await response.json()

        if (response.ok) {
          console.log(returnedData);
          setBookReviews([returnedData, ...bookReviews])
          console.log(bookReviews);
        } else {
          console.log(returnedData)
        }
    }

    const handleDeleteClick = async(id) => {
      const response = await fetch(`/reviews/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const newBookReviews = bookReviews.filter(bookReview => bookReview.id !== id)
        setBookReviews(newBookReviews)
      }

    }

 
    if (!user) {
      return <Login user={user} setUser={setUser}/>
    }

    return(
        <div className='reviews'>
            <div className='book-details-content book_details'>
          <div className='book-details-img'>
            <img src = {book?.image} alt = "cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Author: </span>
              <span className='text-italic'>{book?.author}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Genre: </span>
              <span className='text-italic'>{book?.genre}</span>
            </div>
        <div className='book-details-item'>
          {bookReviews?.map(returnedReview => <ReviewCard key={returnedReview.id} returnedReview={returnedReview} user={user} handleDeleteClick={handleDeleteClick} />)}
        </div>
          </div>
        </div>
        <div className='review_form'>
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-purple-500 p-8 px-8'>
                <input type="text" className='w-full p-2 rounded-lg bg-white mt-2 focus:border-blue-500 focus:bg-white focus:outline-none' id="comment" name="name" onChange={(e) => setComment(e.target.value)} required placeholder='Leave your review' />
                <button type="submit" className='w-full my-5 py-2 bg-white border-purple text-purple font-semibold rounded-lg' onClick={(e) => handleSubmit(e)}>POST</button>
            </form>
        </div>
      </div>
    ) 
    

}
export default Review