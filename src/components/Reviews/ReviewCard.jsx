import "./ReviewCard.css";
import {
  ArchiveBoxXMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

function ReviewCard({ returnedReview, user, handleDeleteClick }) {
  const [showModal, setShowModal] = useState(false);
  const [updatedReview, setUpdatedReview] = useState(returnedReview?.comment);

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`/reviews/${returnedReview.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: updatedReview,
      }),
    });
    const updatedComment = await response.json();

    if (response.ok) {
      console.log(updatedComment);
      returnedReview.comment = updatedReview;
      setShowModal(!showModal);
    } else {
      console.log(updatedComment);
    }
  };

  return (
    <div className="review bg-purple-500 text-white rounded-lg">
      <div>
        <div className="pb-2">{returnedReview.comment}</div>
        <div className="text-sm">
          by: <span className="text-italic">{returnedReview.username}</span>
        </div>
      </div>
      {user.id == returnedReview.user_id ? (
        <div>
          <ArchiveBoxXMarkIcon
            onClick={(e) => handleDeleteClick(returnedReview.id)}
            className="h-9 w-9 icon"
          />
          <PencilSquareIcon onClick={(e) => setShowModal(!showModal)} />
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl text-purple font-semibold">
                        Modal Title
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form className="max-w-[400px] w-full mx-auto rounded-lg bg-purple-500 p-8 px-8">
                        <input
                          type="text"
                          className="w-full p-2 text-purple rounded-lg bg-white mt-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                          value={updatedReview}
                          id="comment"
                          name="name"
                          onChange={(e) => setUpdatedReview(e.target.value)}
                          required
                          placeholder="Leave your review"
                        />
                        <button
                          type="submit"
                          className="w-full my-5 py-2 bg-white border-purple text-purple font-semibold rounded-lg"
                          onClick={(e) => handleUpdateClick(e)}
                        >
                          POST
                        </button>
                      </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ReviewCard;
