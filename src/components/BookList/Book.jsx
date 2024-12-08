import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";

const Book = ({ book }) => {
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col rounded overflow-hidden shadow-lg max-w-md">
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
            to={`/book/${book.id}`}
            style={{ backgroundColor: "#d946ef" }}
            className="block w-full py-3 px-6 text-center font-medium text-white text-[16px] review-btn"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
