import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const CREATE_REVIEW = "reviews/CREATE_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
export const GET_USER_REVIEWS = 'reviews/GET_USER_REVIEWS'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'

/** Action Creators: */
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

export const userReviews = (reviews) => ({
  type: GET_USER_REVIEWS,
  reviews
})

export const changeReview = (review) => ({
  type: UPDATE_REVIEW,
  review
})

/** Thunk Action Creators: */

// GET review by spot id /api/spots/spotId
export const getReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
    return reviews;
  }
};

// POST create review by spotId /apo/spots/spotId/reviews

export const newReview = (spotId, reviewData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      const newReview = await response.json();
      dispatch(createReview(newReview));
      return newReview;
    }
  } catch (error) {
    console.error("Error creating review:", error);
  }
};

// DELETE review by spotid /api/spots/reviewid
export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeReview(reviewId));
    return response;
  }
};

// GET reviews by userId /api/reviews/current

export const getCurrentUserReviews = () => async (dispatch) => {
  const response = await csrfFetch('/api/reviews/current');
  if (response.ok) {
    const { Reviews } = await response.json();
    dispatch(userReviews(Reviews));
  } else {
    throw new Error('Failed to fetch current user reviews');
  }
};

// PUT change review by reviewId /api/reviews/reviewId

export const updateReview = (reviewId, reviewData) => async (dispatch ) => {
  const response = await fetch(`/api/reviewws/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  })

  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(changeReview(updatedReview))
    return updatedReview
  } else {
    const errors = await response.json();
    return errors;
  }

}

/** Reducer: */
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      return {
        ...state,
        ...action.reviews,
      };
    }

    case CREATE_REVIEW: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case REMOVE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    case GET_USER_REVIEWS: {
      const newState = {};
      action.reviews.forEach(review => {
        newState[review.id] = review;
      });
      return newState;
    }
    case UPDATE_REVIEW: {
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    default: {
      return state;
    }
  }
};

export default reviewsReducer;
