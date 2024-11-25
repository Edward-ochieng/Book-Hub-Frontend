import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Modal from "../Modal/Modal";

const Books = ({ user, setUser }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((res) => res.json())
      .then((data) => {
        console.log(user);
        console.log("yeyeah");
        console.log(data);
        setBooks(data);
      });
  }, []);
  if (!user) {
    return <Login user={user} setUser={setUser} />;
  }
  return (
    <div className="grid gap-8 px-5 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
      {books.map((book) => {
        return (
          <div
            className="h-full flex flex-col rounded overflow-hidden shadow-lg max-w-md"
            key={book.id}
          >
            <div className="w-full h-[300px]">
              <img
                className="w-full h-full object-cover"
                src={book.image}
                alt="Book_Image"
              />
            </div>
            <div className="px-6 py-4 flex-1 flex flex-col text-center">
              <div className="font-bold uppercase text-xl mb-2 line-clamp-2">
                {book.title}
              </div>
              <div className="font-semibold text-lg mb-2">{book.author}</div>
              <div className="font-normal text-lg mb-2">{book.genre}</div>
              <p className="text-gray-700 text-base line-clamp-3 mb-2">
                {book.description}
              </p>
              <div className="mt-auto">
                <p className="text-purple-500 text-lg font-semibold mb-4">
                  KSH {book.price}
                </p>
                <Link
                  to="/reviews"
                  state={{ book_id: book.id }}
                  style={{ backgroundColor: "#d946ef" }}
                  className="block w-full py-3 px-6 text-center font-medium text-white text-[16px] review-btn"
                >
                  Add Review
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Books;
