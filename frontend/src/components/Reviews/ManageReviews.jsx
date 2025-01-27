// Refactored Code:
import { Link } from "react-router-dom";
import { TiStarFullOutline } from "react-icons/ti";
import noimage from "../Images/ptstLogo.png";

const ReviewItems = ({ spot }) => {
  return (
    <div id="spots-container" title={spot.name}>
      <Link to={`/spots/${spot.id}`} className="spot-link">
        <div className="spot-image-container">
          <img
            className="spots-image"
            src={spot?.previewImage || noimage}
            alt={spot.name || "Default Spot Image"}
          />
        </div>

        <div className="spot-text-container">
          <div className="spot-text">
            <div className="location-text">
              {spot.city}, {spot.state}
            </div>
            <div className="price">
              ${spot.price} <span className="price-span">night</span>
            </div>
          </div>
          <div className="rating">
            <div className="landing-page-star">
              <TiStarFullOutline />
            </div>
            {spot.avgRating && !isNaN(spot.avgRating) ? spot.avgRating : "New"}{" "}
            {spot.numReviews
              ? `${spot.numReviews} ${spot.numReviews === 1 ? "review" : "reviews"}`
              : ""}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ReviewItems;


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getCurrentUserReviews } from "../../store/reviewReducer";
// import ReviewItems from "./ReviewItems";
// import CreateReviewModal from "./CreateNewReviewModal";
// import OpenModalButton from "../OpenModalButton";
// import { useModal } from "../../context/Modal";
// import StarDisplay from "../Spots/StarsDisplay";

// const ManageReviews = () => {
//   const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const { closeModal } = useModal();
//   const { spotId } = useParams();

//   const reviews = useSelector((state) => state.reviews);
//   const spots = useSelector((state) => state.spots.allSpots); // Get all spots from Redux store
//   const currentUser = useSelector((state) => state.session.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       await dispatch(getCurrentUserReviews());
//     };

//     fetchData();
//   }, [dispatch]);

//   // Check if the review is owned by the current user!
//   const currentUsersReviews = Object.values(reviews).filter((review) => {
//     return review.User.id === currentUser.id;
//   });

//   return (
//     <>
//       {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
//       <div id="manage-reviews-container">
//         <section className="manage-reviews-header">
//           <h1>Manage Reviews</h1>
//           <div className="users-reviews-container">
//             {currentUser && currentUsersReviews.length > 0 ? (
//               currentUsersReviews.map((review) => {
//                 // Find the corresponding spot for each review
//                 const spot = spots[review.spotId];

//                 return (
//                   <div key={review.id} className="review-item">
//                     {/* Display SpotItems for the review */}
//                     {spot && <ReviewItems spot={spot} key={spot.id} />}

//                     {/* Display review information */}
//                     <h3>{review.Spot?.name}</h3>
//                     <p>{review.review}</p>
//                     <StarDisplay numStars={review.stars} />
//                     <div style={{ padding: "10px 0" }}>
//                       <OpenModalButton
//                         modalStyling="spots-post-your-review-button"
//                         buttonText={"Edit Review"}
//                         modalComponent={
//                           <CreateReviewModal
//                             spotId={spotId}
//                             onClose={closeModal}
//                           />
//                         }
//                       />
//                       {/* {reviews.length === 0 && (
//                   <span>Be the first to post a review!</span>
//                 )} */}
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>No reviews to display.</p>
//             )}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default ManageReviews;
