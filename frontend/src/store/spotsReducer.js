import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const GET_SPOT = "spots/GET_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";

// export const CREATE_SPOT_IMAGE = "spots/CREATE_SPOT_IMAGE";

export const GET_OWNER_SPOT = "spots/GET_OWNER_SPOT";
export const EDIT_SPOT = "spots/EDIT_SPOT";

export const REMOVE_SPOT = "spots/REMOVE_SPOT";

/**  Action Creators: */

// Load all the spots
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

// Get single spot by id
export const getSpot = (spot) => ({
  type: GET_SPOT,
  spot,
});

// Create a new spot
export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

//Create a spot image
// export const createSpotImage = (image) => ({
//   type: CREATE_SPOT_IMAGE,
//   image,
// });

// Get Spots by Owner
export const getOwnerSpot = (spots) => ({
  type: GET_OWNER_SPOT,
  spots,
});

// Update Spot by spotId

export const editSpot = (spot) => ({
  type: EDIT_SPOT,
  spot,
});

// Delete spot by id
export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});

/** Thunk Action Creators: */

// GET all spots /api/spots
export const getAllSpots = () => async (dispatch) => {
  try {
    const response = await fetch("/api/spots");
    if (response.ok) {
      const data = await response.json();
      // console.log("this is the daataaa", data);
      let spots = data.Spots;
      // console.log('THIS IS SPOTS!', spots)
      if (Array.isArray(spots)) {
        dispatch(loadSpots(spots));
        return spots;
      } else {
        console.log("Error: spots is not an array", spots);
      }
    } else {
      const error = await response.json();
      console.log(error);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

// GET spot by id /api/spot/:spotId
export const getSpotById = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
  } else {
    const error = await response.json();
    console.log(error);
  }
};

// POST create new spot /api/spots/new

export const createNewSpot =
  (spot, previewImage, images) => async (dispatch) => {
    try {
      const response = await csrfFetch("/api/spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(spot),
      });

      if (response.ok) {
        const newSpot = await response.json();
        const spotImages = []; // STORE IT IN THE SPOTIMAGES ARRAY!!!

        // Create the preview image first
        const previewImageResponse = await csrfFetch(
          `/api/spots/${newSpot.id}/images`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: previewImage, preview: true }),
          }
        );

        if (previewImageResponse.ok) {
          const previewImageResult = await previewImageResponse.json();
          spotImages.push(previewImageResult);
          // console.log('Preview Image Result!?!?!?!?!', previewImageResult)
        }

        // Create the other images, iterate through a for loop
        for (const image of images) {
          if (image) {
            const imageResponse = await csrfFetch(
              `/api/spots/${newSpot.id}/images`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: image, preview: false }),
              }
            );

            if (imageResponse.ok) {
              const imageResult = await imageResponse.json();
              spotImages.push(imageResult);
              // console.log('The other images?', imageResult)
            }
          }
        }

        newSpot.images = spotImages;
        // console.log('See that new spot', newSpot)

        dispatch(createSpot(newSpot));
        return newSpot;
      } else {
        const errors = await response.json();
        throw new Error(errors);
      }
    } catch (error) {
      console.error("Error creating new spot with images:", error);
      throw error;
    }
  };

// GET spot by owner /api/spots/current

export const getCurrentUserSpots = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/spots/current");

    if (response.ok) {
      const spots = await response.json();
      dispatch(getOwnerSpot(spots));
    } else {
      const error = await response.json();
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

//UPDATE update spot by id /api/spots/spotId

export const updateSpot = (spotId, spot) => async (dispatch) => {
  // console.log('!!!!!!!!!!!!!!', spotId)
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(editSpot(updatedSpot));
    return updatedSpot;
  } else {
    const errors = await response.json();
    throw new Error(errors);
  }
};

// DELETE delete spot by id /api/spots/:spotId

export const deleteSpot = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatch(removeSpot(spotId));
    } else {
      const error = await response.json();
      console.log(error);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

const initialState = { allSpots: {}, currentSpot: {} };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { ...state, allSpots: {} };
      action.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }
    case GET_SPOT: {
      return { ...state, currentSpot: action.spot };
    }
    case CREATE_SPOT: {
      const newSpot = action.spot;
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [newSpot.id]: newSpot,
        },
        currentSpot: newSpot,
      };
    }

    // case CREATE_SPOT_IMAGE: {
    //   const { spotId, image } = action;
    //   const spot = state.allSpots[spotId] || state.currentSpot;
    //   if (spot) {
    //     spot.images = [...(spot.images || []), image];
    //   }
    //   return {
    //     ...state,
    //     allSpots: {
    //       ...state.allSpots,
    //       [spotId]: spot,
    //     },
    //     currentSpot: spot,
    //   };
    // }

    case GET_OWNER_SPOT: {
      const ownerSpots = {};
      action.spots.Spots.forEach((spot) => {
        ownerSpots[spot.id] = spot;
      });
      return { allSpots: { ...ownerSpots }, currentSpot: { ...ownerSpots } };
    }
    case EDIT_SPOT: {
      const updatedSpot = action.spot;
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [updatedSpot.id]: updatedSpot,
        },
        currentSpot: updatedSpot,
      };
    }
    // case EDIT_SPOT: {
    //   const newState = {
    //     ...state,
    //     allSpots: { ...state.allSpots, [action.spot.id]: action.spot },
    //     currentSpot: action.spot,
    //   };
    //   return newState;
    // }

    case REMOVE_SPOT: {
      const newState = { ...state };
      delete newState.allSpots[action.spotId];
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
