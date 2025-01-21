import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview, getReviews } from '../../store/reviewReducer';
// import { GoStar } from "react-icons/go";
// import { GoStarFill } from "react-icons/go";
// import { IoFish } from "react-icons/io5";
// import { IoFishOutline } from "react-icons/io5";

import { PiFish } from "react-icons/pi";
import { PiFishFill } from "react-icons/pi";

import './CreateNewReviewModal.css'

const CreateReviewModal = ({ spotId, onClose }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const currentSpot = useSelector((state) => state.spots.currentSpot[0]);
  // console.log('What is the current spot?', currentSpot)

  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleMouseEnter = (index) => {

      setRating(index + 1);

  };

  const handleMouseLeave = () => {

      setRating(rating);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!review || review.length < 10 || review.trim() === "") {
      newErrors.review = 'Review must be 10 characters or more';
    }
    if (rating < 1 || rating > 5) {
      newErrors.stars = 'Stars rating must be between 1 and 5';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const reviewData = {
        review,
        stars: rating,
      };
      // console.log('What is this review data looking like', reviewData)
      // console.log('Review looking like? ', review)
      // console.log(typeof review)
      // console.log("All of the stars", rating)
      // console.log(typeof rating)

      const response = await dispatch(newReview(spotId, reviewData));

      if (response && response.id) {
        await dispatch(getReviews(spotId));
        onClose();
      }
    }
  };

  const maxStars = 5;
  const starIcons = [];

  for (let i = 0; i < maxStars; i++) {
    starIcons.push(
      <span
        key={i}
        onMouseEnter={() => handleMouseEnter(i)}
        onClick={() => handleClick(i)}
        onMouseLeave={handleMouseLeave}
        style={{paddingTop: '10px'}}
        >
        {/* {i < rating ? <IoFish /> : <IoFishOutline />} */}
        {i < rating ? <PiFishFill /> : <PiFish />}

      </span>
    );
    }


  return (
    <div id="create-review-modal">
      <h1 style={{ textAlign: 'center' }}>
        How was your stay at
        <div>{currentSpot.name}?</div>
      </h1>
      <div className="errors-object">
        {errors.review && <p>{errors.review}</p>}
        {errors.stars && <p>{errors.stars}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
        />
        <div className="star-rating">{starIcons} stars</div>
        <button type="submit" className="submit-review-button" disabled={review.length < 10}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default CreateReviewModal;
