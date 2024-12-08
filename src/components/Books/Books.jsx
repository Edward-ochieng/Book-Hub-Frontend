import React, { useState, useEffect } from "react";
import Book from "../BookList/Book";
import Login from "../../pages/Login/Login";

const Books = ({ user, setUser }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books || []);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setBooks([]);
      });
  }, []);

  if (!user) {
    return <Login user={user} setUser={setUser} />;
  }

  return (
    <div className="grid gap-8 px-5 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
      {books && books.map((book) => <Book key={book.id} book={book} />)}
    </div>
  );
};

export default Books;
