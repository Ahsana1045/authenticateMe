import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spotsReducer";
import { getReviews } from "../../store/reviewReducer";

import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";

import StarDisplay from "./StarsDisplay";
// import BookingDetails from "../Booking/BookingDetails";

import DeleteReviewModal from "../Reviews/DeleteReviewModal";
import CreateReviewModal from "../Reviews/CreateNewReviewModal";

import { PiFishFill } from "react-icons/pi";
import { LuCat } from "react-icons/lu";

import noimage from "../Images/ptstLogo.png";
import dogImage from "../Images/Confused-dog.png"

import "./SpotDetails.css";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const { closeModal } = useModal();

  // Get all spots and current spot from the Redux store
  // const spots = useSelector((state) => state.spots.allSpots[spotId]);
  // console.log("ALLLLLLLL SPOTS", spots);
  const currentSpot = useSelector((state) => state.spots.currentSpot[0]);
  // console.log("%c Spot Details: currrrrrrrrrrrrrrrrrrrrrrrrrrrrrent spot","color: orange", currentSpot)

  // Get the reviews for the current spot
  const reviews = useSelector((state) => state.reviews.Reviews || []);
  // console.log("SHOWWWWWWWWWWWWW REVIEWS", reviews);

  const user = useSelector((state) => state.session.user);
  // console.log(`WHOOOOOOOOOOOOOOO DIS`, user);

  const totalRating = reviews.reduce((acc, review) => acc + review.stars, 0);
  const avgRating = reviews.length > 0 ? totalRating / reviews.length : "New";
  const numReviews = reviews.length;

  // console.log("The total", totalRating);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getSpotById(spotId)),
        dispatch(getReviews(spotId)),
      ]);
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch, spotId]);

  const reserveButtonClick = () => {
    alert("Feature Coming Soon...");
  };

  // Check if this user has already left a review on the spot
  const userHasReview = reviews.find((review) => review.userId === user?.id);

  // Load DOG If data is not loaded yet and show a loading message
  if (!isLoaded || !currentSpot)
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>We&apos;re almost rooof!</h1>
        <img
          style={{ width: "1000px" }}
          src={dogImage}
          alt="Dawg Confused"
        />
      </div>
    );

  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
      <div id="spot-detail-container">
        <section className="listing-name-container">
          <h1>{currentSpot.name}</h1>
          <span className="location">
            {currentSpot.city}, {currentSpot.state}, {currentSpot.country}
          </span>
        </section>

        <div className="images-container">
          <div className="main-image-left">
            <img
              className="main-image"
              src={currentSpot?.SpotImages[0]?.url || noimage}
              alt="Main spot"
            />
          </div>
          <div className="images-container-right">
            <img
              className="side-image"
              src={currentSpot?.SpotImages[1]?.url || noimage}
              alt="spots pic"
            />
            <img
              className="side-image"
              src={currentSpot?.SpotImages[2]?.url || noimage}
              alt="spots pic"
              style={{ borderTopRightRadius: "10px" }}
            />
            <img
              className="side-image"
              src={currentSpot?.SpotImages[3]?.url || noimage}
              alt="spots pic"
            />
            <img
              className="side-image"
              src={currentSpot?.SpotImages[4]?.url || noimage}
              alt="Spot pic"
              style={{ borderBottomRightRadius: "10px" }}
            />
          </div>
        </div>

        <section className="location-info-container-mid">
          <div className="owner-description-container">
            <h2 className="owner-info">
              Hosted by {currentSpot?.Owner?.firstName}{" "}
              {currentSpot?.Owner?.lastName}
              <div className='cat-icon'>
              <LuCat />

              </div>
            </h2>
            <p className="description" style={{ width: "90%" }}>
              {currentSpot.description}
            </p>
          </div>
          <div className="reserve-container">
            <div className="reserve-top">
              <div className="price-details">
                ${currentSpot.price}{" "}
                <span className="price-span-details">night</span>
              </div>
              {/* <div className="reviews-details">
                <TiStarFullOutline />
                {isNaN(currentSpot.avgRating) ||
                currentSpot.avgRating === undefined
                  ? "New"
                  : currentSpot.avgRating}{" "}
                {isNaN(currentSpot.avgRating) ||
                currentSpot.avgRating === undefined
                  ? ""
                  : "·"}{" "}
                {currentSpot.numReviews === 1
                  ? "1 Review"
                  : currentSpot.numReviews > 1
                  ? `${currentSpot.numReviews} Reviews`
                  : ""}
              </div> */}

              <div className="reviews-details">
                <div className="spot-details-star">
                  {/* <TiStarFullOutline /> */}
                  <PiFishFill />
                </div>
                <div className="spot-details-reviews">
                  {isNaN(avgRating) || avgRating === undefined
                    ? "New"
                    : avgRating.toFixed(2)}{" "}
                  {isNaN(avgRating) || avgRating === undefined ? "" : "·"}{" "}
                  {numReviews === 1
                    ? "1 Review"
                    : numReviews > 1
                    ? `${numReviews} Reviews`
                    : ""}
                </div>
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <button className="reserve-button" onClick={reserveButtonClick}>
                Reserve
              </button>
            </div>
          </div>
        </section>
        <hr />

        {/* <section id='booking-container'> */}
          {/* <div> */}
            {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
            {/* <BookingDetails /> */}
          {/* </div> */}

        {/* </section> */}
        <hr />

        <section id="reviews-container">
          <div className="star-and-reviews-container">
            {/* <TiStarFullOutline /> */}
            <StarDisplay numStars={avgRating} style={{ padding: "5px", fontSize: "22px" }} />
            {isNaN(avgRating) || avgRating === undefined
              ? "New"
              : avgRating.toFixed(2)}{" "}
            {isNaN(avgRating) || avgRating === undefined ? "" : "·"}{" "}
            {numReviews === 1
              ? "1 Review"
              : numReviews > 1
              ? `${numReviews} Reviews`
              : ""}
          </div>

          <div>
            {user && user.id !== currentSpot.ownerId && !userHasReview && (
              <div style={{ padding: "10px 0" }}>
                <OpenModalButton
                  modalStyling="spots-post-your-review-button"
                  buttonText={"Post Your Review"}
                  modalComponent={
                    <CreateReviewModal spotId={spotId} onClose={closeModal} />
                  }
                />
                {/* {reviews.length === 0 && (
                  <span>Be the first to post a review!</span>
                )} */}
              </div>
            )}
            {/* <span>ʕ*•ﻌ•ʔฅ </span> */}
            {reviews.length === 0 &&
              user?.id !== currentSpot.ownerId &&
              currentSpot.Owner && <span>Be the first to post a review!</span>}
          </div>
          <div className='review-from-cats-outer-container'>

          <div className="reviews-from-the-cats">
            {reviews &&
              reviews.length > 0 &&
              (() => {
                const reversedReviews = [];
                for (let i = reviews.length - 1; i >= 0; i--) {
                  const review = reviews[i];
                  const createdAtDate = new Date(review.createdAt);
                  const month = createdAtDate.toLocaleString("default", {
                    month: "long",
                  });
                  const year = createdAtDate.getFullYear();

                  reversedReviews.push(
                    <div key={i} className="actual-reviews">
                      <span style={{ fontSize: "18px" }}>

                      {review.User.firstName}
                      </span>
                      <span
                        style={{ fontSize: "14px", color: "grey" }}
                      >{`${month} ${year}`}</span>
                      <span>
                        <StarDisplay numStars={review.stars} />
                      </span>
                      <span style={{ fontSize: "12px" }}>{review.review}</span>
                      {user && user.id === review.userId && (
                        <div id="delete-review-button">
                          <OpenModalButton
                            modalStyling="spots-review-delete-button"
                            buttonText="Delete"
                            modalComponent={
                              <DeleteReviewModal
                                reviewId={review.id}
                                spotId={spotId}
                              />
                            }
                          />
                        </div>
                      )}
                    </div>
                  );
                }
                return reversedReviews;
              })()}
          </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SpotDetails;
