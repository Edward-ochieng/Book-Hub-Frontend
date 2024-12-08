import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import BookDiscussions from "../Discussions/BookDiscussions";

const BookDetails = ({ user }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBookDetails() {
      try {
        const response = await fetch(`/books/${id}`);
        const data = await response.json();

        if (response.ok) {
          setBook(data.book || data);
          console.log("Book data:", data);
        } else {
          console.error("Error fetching book:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getBookDetails();
    }
  }, [id]);

  if (loading) return <Loading />;
  if (!book) return <div>No book found</div>;

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/books")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img w-full">
            <img
              src={book.image || coverImg}
              alt="cover img"
              className="w-full h-auto max-h-[600px] object-contain"
            />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book.title}</span>
            </div>
            <div className="book-details-item description">
              <span>{book.description}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Author: </span>
              <span className="text-italic">{book.author}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Genre: </span>
              <span className="text-italic">{book.genre}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Price: </span>
              <span>KSH {book.price}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <BookDiscussions bookId={id} user={user} />
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
