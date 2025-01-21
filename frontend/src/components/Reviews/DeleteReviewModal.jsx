import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { deleteReview, getReviews } from "../../store/reviewReducer";
import './DeleteReviewModal.css'

const DeleteReviewModal = ({ reviewId, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // console.log(' ~~~~~~~~~~~~~~', reviewId)
  // console.log(' wooooooooooooooooooooo', spotId)

  // Async to delete the review, then fetch the reviews.
  // Modal closes after deleting the review
  const handleDelete = async (e) => {
    e.preventDefault();

    // Dispatch deleteReview action on review associated with reviewId
    await dispatch(deleteReview(reviewId));

    // Dispatch getReviews action to fetch the updated list of reviews for the spotId
    await dispatch(getReviews(spotId));

   await closeModal();
  };

  return (
    <>
    <div id='delete-review-modal'>
      <h1 style={{textAlign: 'center'}}> Confirm Delete</h1>

    <div className='delete-review-confirmation'>
      <span >Are you sure you want to delete this review?</span>
      <button onClick={handleDelete}
      className='modal-button-confirm-yes'>
        Yes (Delete Review)
        </button>
      <button
      onClick={() => closeModal()}
      className='modal-button-confirm-no'>
        No (Keep Review)
        </button>
       </div>
        </div>
    </>
  );
};

export default DeleteReviewModal;
