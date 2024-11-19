import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Login from '../../pages/Login/Login'
import Modal from '../Modal/Modal'

const Books = ({user, setUser}) => {
    const [books, setBooks] = useState([])
    
    useEffect(()=>{
        fetch('/books')
        .then((res)=> res.json())
        .then((data)=> {
            console.log(user)
            console.log("yeyeah")
            console.log(data)
            setBooks(data)
        
        })
    }, [])
        if (!user) {
            return <Login user={user} setUser={setUser}/>

            
        }
    return(
        <div className="grid gap-10 px-5 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-">
            {books.map((book)=>{
                return(
                    <div className="max-w-sm rounded overflow-hidden shadow-lg " key={book.id}>
                        <img className="w-full" src={book.image} alt="Book_Image" />
                        <div className="px-6 py-4">
                        <div className="font-bold uppercase text-2xl mb-2">{book.title}</div>
                        <div className="font-semibold text-xl mb-2">{book.author}</div>
                        <div className="font-normal text-xl mb-2">{book.genre}</div>
                            <p className="text-gray-700 text-base">
                        {book.description}
                        </p>
                        <p className='text-purple-500'>KSH {book.price}</p>
                        <Link to="/reviews" state={{ book_id: book.id }}  style={{ backgroundColor: 'black' }} className='w-full py-4 px-6 font-medium text-[18px] review-btn'>Add Review</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Books