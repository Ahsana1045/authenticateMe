// routes/api/spots.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');



const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { getSpots } = require('../../routes/controllers/spotController')

// Route to get all spots
router.get('/', async (req, res) => {
  try {
      const spots = await Spot.findAll({
          // attributes: [
          //     'id',
          //     'ownerId',
          //     'address',
          //     'city',
          //     'state',
          //     'country',
          //     'lat',
          //     'lng',
          //     'name',
          //     'description',
          //     'price',
          //     'avgRating',
          //     'previewImage',
          //     'createdAt',
          //     'updatedAt'
          // ],
          include: [
              {model: User, as: 'owner'},

              {
                  model: SpotImage,
                  as:'SpotImages',
                  attributes: ['url'],
                  where: { preview: true }, // Include only preview images
                  required: false, // If no preview image exists, still return the spot
              },
              {
                  model: Review,
                  as: 'reviews',
                  attributes: [],
                  required: false, // If no reviews exist, still return the spot
              }
          ],
      });

      // Map the results to include avgRating and previewImage
      const formattedSpots = spots.map((spot) => {
          const avgRating = spot.Reviews
              ? spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length
              : null;

          return {
              id: spot.id,
              ownerId: spot.ownerId,
              address: spot.address,
              city: spot.city,
              state: spot.state,
              country: spot.country,
              lat: spot.lat,
              lng: spot.lng,
              name: spot.name,
              description: spot.description,
              price: spot.price,
              createdAt: spot.createdAt,
              updatedAt: spot.updatedAt,
              avgRating: avgRating ? Number(avgRating.toFixed(1)) : null,
              previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
          };
      });

      res.status(200).json({ Spots: formattedSpots });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching spots.' });
  }
});

//GETs spots of current user
router.get('/current', requireAuth, async (req, res) => {
    try {
        const { user } = req;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized access.' });
        }

        // Fetch spots owned by the current user
        const userSpots = await Spot.findAll({
            where: { ownerId: user.id },
            attributes: [
                'id',
                'ownerId',
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'description',
                'price',
                'previewImage',
                'avgRating',
                'createdAt',
                'updatedAt'
            ]
        });

        if (!userSpots || userSpots.length === 0) {
            return res.status(404).json({ message: 'No spots found for this user.' });
        }

        // Format the spots
        const formattedSpots = userSpots.map((spot) => spot.toJSON());

        res.status(200).json({ Spots: formattedSpots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user spots.' });
    }
});

//GETs spot details by spotId:'''
router.get('/:spotId', async (req, res, next) => {
  const { spotId } = req.params;
  try {
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          as: 'SpotImages',  // Ensure SpotImages alias is correct
          attributes: ['id', 'url', 'preview'],
        },
        {
          model: User,
          as: 'owner',  // Ensure alias matches 'owner' for the Owner
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Review,
          as: 'reviews',  // Ensure alias matches 'reviews'
          attributes: ['review', 'stars'],
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({ message: 'Spot couldn\'t be found' });
    }

    // Calculate numReviews and avgStarRating
    const numReviews = spot.reviews.length;
    const avgStarRating = numReviews > 0
      ? spot.reviews.reduce((acc, review) => acc + review.stars, 0) / numReviews
      : null;

    // Format the response to include numReviews and avgStarRating
    const spotResponse = {
      ...spot.toJSON(),
      numReviews,
      avgStarRating,
    };

    // Map reviews to include the correct format (if necessary)
    spotResponse.reviews = spotResponse.reviews.map((review) => ({
      review: review.review,
      stars: review.stars,
    }));

    // Map SpotImages to include the correct format (if necessary)
    spotResponse.SpotImages = spotResponse.SpotImages.map((spotImage) => ({
      id: spotImage.id,
      url: spotImage.url,
      preview: spotImage.preview,
    }));

    // Format the Owner information (if necessary)
    spotResponse.Owner = {
      id: spot.owner.id,
      firstName: spot.owner.firstName,
      lastName: spot.owner.lastName,
    };

    res.json(spotResponse);
  } catch (err) {
    next(err);
  }
});


// router.get('/:spotId', async (req, res, next) => {






//   const { spotId } = req.params;
//   try {
//     const spot = await Spot.findByPk(spotId, {
//       include: [
//         {
//           model: SpotImage,
//           as: 'SpotImages',  // Correct alias for SpotImage
//           attributes: ['id', 'url', 'preview']
//         },
//         {
//           model: User,
//           as: 'owner',  // Correct alias for the User model
//           attributes: ['id', 'firstName', 'lastName']
//         },
//         {
//           model: Review,
//           as: 'reviews',  // Correct alias for the Review model (should match the alias defined in Spot model)
//           attributes: ['review', 'stars'],
//         },
//       ],
//     });

//     if (!spot) {
//       return res.status(404).json({ message: 'Spot not found' });
//     }

//     // Calculate numReviews and avgStarRating
//     const numReviews = spot.reviews.length;
//     const avgStarRating = numReviews > 0
//       ? spot.reviews.reduce((acc, review) => acc + review.stars, 0) / numReviews
//       : null;

//     // Format the response to include numReviews and avgStarRating
//     const spotResponse = {
//       ...spot.toJSON(),
//       numReviews,
//       avgStarRating,
//     };

//     res.json(spotResponse);
//   } catch (err) {
//     next(err);
//   }
// });





// router.get('/:spotId', async (req, res, next) => {
//   const { spotId } = req.params;
//   try {
//     const spot = await Spot.findByPk(spotId, {
//       include: [
//         {
//           model: SpotImage,
//           as: 'SpotImages',
//           attributes: ['id', 'url', 'preview']
//         },
//         {
//           model: User,
//           as: 'owner',  // Correct alias for the User model
//           attributes: ['id', 'firstName', 'lastName']
//         },
//         {
//           model: Review,
//           as: 'reviews',  // Correct alias for the Review model (match 'spot' here)
//           attributes: ['rating'],
//         },
//       ],
//     });

//     if (!spot) {
//       return res.status(404).json({ message: 'Spot not found' });
//     }

//     // Calculate numReviews and avgStarRating
//     const numReviews = spot.Reviews.length;
//     const avgStarRating = numReviews > 0
//       ? spot.Reviews.reduce((acc, review) => acc + review.stars, 0) / numReviews
//       : null;

//     // Format the response to include numReviews and avgStarRating
//     const spotResponse = {
//       ...spot.toJSON(),
//       numReviews,
//       avgStarRating,
//     };

//     res.json(spotResponse);
//   } catch (err) {
//     next(err);
//   }
// });









// router.get('/:spotId', async (req, res, next) => {
//   const { spotId } = req.params;
//   try {
//     const spot = await Spot.findByPk(spotId, {
//       include: [
//         {
//           model: SpotImage,
//           as: 'SpotImages',
//           attributes: ['id', 'url', 'preview']
//         },
//         {
//           model: User,
//           as: 'owner',
//           attributes: ['id', 'firstName', 'lastName']
//         },
//         {
//           model: Review,
//           as: 'spot',
//           attributes: ['rating'],
//         },
//       ],
//     });

//     if (!spot) {
//       return res.status(404).json({ message: 'Spot not found' });
//     }

//     // Calculate numReviews and avgStarRating
//     const numReviews = spot.Reviews.length;
//     const avgStarRating = numReviews > 0
//       ? spot.Reviews.reduce((acc, review) => acc + review.rating, 0) / numReviews
//       : null;

//     // Format the response to include numReviews and avgStarRating
//     const spotResponse = {
//       ...spot.toJSON(), // spreads the spot data into the response
//       numReviews,
//       avgStarRating,
//     };

//     res.json(spotResponse);
//   } catch (err) {
//     next(err);
//   }
// });






// router.get('/:spotId', async (req, res, next) => {
//   const { spotId } = req.params;
//   try {
//     const spot = await Spot.findByPk(spotId);
//     if (!spot) {
//       return res.status(404).json({ message: 'Spot not found' });
//     }
//     res.json(spot);
//   } catch (err) {
//     next(err);
//   }
// });
// router.get('/:spotId', async (req, res) => {
//     try {
//         const { spotId } = req.params;

//         // Find the spot by ID
//         const spot = await Spot.findOne({
//             where: { id: spotId },
//             attributes: [
//                 'id',
//                 'ownerId',
//                 'address',
//                 'city',
//                 'state',
//                 'country',
//                 'lat',
//                 'lng',
//                 'name',
//                 'description',
//                 'price',
//                 'createdAt',
//                 'updatedAt'
//             ],
//             // Include associations like SpotImages or Reviews if needed
//             include: [{ model: SpotImage }, { model: Review }]
//         });

//         if (!spot) {
//             return res.status(404).json({ message: "Spot couldn't be found" });
//         }

//         res.status(200).json(spot);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching the spot details.' });
//     }
// });


// Route to handle GET requests for spots
// router.get('/', getSpots);

//CREATE a spot:

router.post('/', requireAuth, handleValidationErrors, async (req, res) => {
    try {
        const { id: ownerId } = req.user; // Extract user ID from the authenticated user
        const {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        } = req.body;

        // Validate required fields
        if (
            !address ||
            !city ||
            !state ||
            !country ||
            !lat ||
            !lng ||
            !name ||
            !description ||
            !price
        ) {
            return res.status(400).json({
                message: "Bad Request"
            });
        }

        // Create the new spot
        const newSpot = await Spot.create({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        });

        // Respond with the created spot
        res.status(201).json(newSpot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Bad Request' });
    }
});

// GET all reviews by spotId:
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params; // Extract spotId from URL params

  try {
    // Fetch all reviews for the given spotId
    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          as: 'user', // Include user information (e.g., name) for each review
          attributes: ['id', 'firstName', 'lastName'], // Customize the attributes to return for the user
        },
        {
          model: Spot,
          as: 'spot', // Include spot information (e.g., name) for each review (optional)
          attributes: ['id', 'name'],
        },
      ],
    });

    // If no reviews found, return a message
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this spot' });
    }

    // Return the reviews in the response
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving reviews.' });
  }
});


router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  try {
    // Get spotId from request parameters and review data from the body
    const { spotId } = req.params;
    const { review, stars } = req.body;

    // Check if the spot exists in the database
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: 'Spot not found' });
    }

    // Get the authenticated user's ID
    const userId = req.user.id;

    // Check if the user has already left a review for this spot
    const existingReview = await Review.findOne({
      where: {
        spotId: spotId,
        userId: userId,
      },
    });

    if (existingReview) {
      return res.status(500).json({
        message: 'User already has a review for this spot',
      });
    }

    // Create a new review
    const newReview = await Review.create({
      userId,        // Set the userId (from the logged-in user)
      spotId,        // Set the spotId (from the URL)
      review,        // The review text
      stars,         // The star rating (1-5)
    });

    return res.status(201).json(newReview); // Return the created review
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Bad Request' });
  }
});




// Add an image to a spot based on its ID

router.post('/:spotId/images', requireAuth, handleValidationErrors, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const userId = req.user.id; // Get the user ID from the authenticated user

  try {
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check if the authenticated user is the owner of the spot
    if (spot.ownerId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You are not the owner of this spot' });
    }

    // Create the SpotImage associated with the spot
    const newImage = await SpotImage.create({
      url,
      preview,
      spotId,
    });

    // Return the image details in the required response format
    return res.status(201).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the image.' });
  }
});




// router.post('/:spotId/images', requireAuth, handleValidationErrors, async (req, res) => {
//     const { spotId } = req.params;  // Extract spotId from the route parameter
//     const { url, preview } = req.body;

//     try {
//       // Check if the spot exists
//       const spot = await Spot.findByPk(spotId);

//       if (!spot) {
//         return res.status(404).json({ message: "Spot coundn't be found" });
//       }

//       // Create the SpotImage associated with the spot
//       const newImage = await SpotImage.create({
//         url,
//         preview,
//         spotId, // Associate the image with the spot's id
//       });

//       // Return the image details in the required response format
//       return res.status(201).json({
//         id: newImage.id,
//         url: newImage.url,
//         preview: newImage.preview
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while adding the image.' });
//     }
//   });



  // Route to update a spot by spotId

  // Validation checks for the request body
  const validateSpotUpdate = [
    check('address').notEmpty().withMessage('Street address is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude is not valid'),
    check('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude is not valid'),
    check('name').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    check('description').notEmpty().withMessage('Description is required'),
    check('price').isFloat({ min: 0 }).withMessage('Price per day is required'),
  ];

  router.put('/:spotId', requireAuth, validateSpotUpdate, handleValidationErrors, async (req, res) => {
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const userId = req.user.id;

    try {
      // Find the spot by spotId
      const spot = await Spot.findByPk(spotId);

      // If the spot doesn't exist, return a 404 error
      if (!spot) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' });
      }

      // Check if the authenticated user is the owner of the spot
      if (spot.ownerId !== userId) {
        return res.status(403).json({ message: 'Forbidden: You are not the owner of this spot' });
      }

      // Update the spot with the provided details
      spot.address = address || spot.address;
      spot.city = city || spot.city;
      spot.state = state || spot.state;
      spot.country = country || spot.country;
      spot.lat = lat || spot.lat;
      spot.lng = lng || spot.lng;
      spot.name = name || spot.name;
      spot.description = description || spot.description;
      spot.price = price || spot.price;

      // Save the updated spot
      await spot.save();

      // Return the updated spot in the specified format
      return res.status(200).json({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: 'An error occurred while updating the spot.' });
    }
  });

  module.exports = router;








  // router.put('/:spotId', requireAuth, handleValidationErrors, async (req, res) => {
  //   const { spotId } = req.params;
  //   const { address, city, state, country, lat, lng, name, description, price } = req.body;

  //   try {
  //     // Find the spot by spotId
  //     const spot = await Spot.findByPk(spotId);

  //     // If the spot doesn't exist, return a 404 error
  //     if (!spot) {
  //       return res.status(404).json({ error: 'Spot not found' });
  //     }

  //     if(spot.ownerId !== userId){
  //       return res.status(403).json({message: "Forbidden"})
  //     }


  //     // Update the spot with the provided details
  //     spot.address = address || spot.address;
  //     spot.city = city || spot.city;
  //     spot.state = state || spot.state;
  //     spot.country = country || spot.country;
  //     spot.lat = lat || spot.lat;
  //     spot.lng = lng || spot.lng;
  //     spot.name = name || spot.name;
  //     spot.description = description || spot.description;
  //     spot.price = price || spot.price;

  //     // Save the updated spot
  //     await spot.save();

  //     // Return the updated spot in the specified format
  //     return res.status(200).json({
  //       id: spot.id,
  //       ownerId: spot.ownerId,
  //       address: spot.address,
  //       city: spot.city,
  //       state: spot.state,
  //       country: spot.country,
  //       lat: spot.lat,
  //       lng: spot.lng,
  //       name: spot.name,
  //       description: spot.description,
  //       price: spot.price,
  //       createdAt: spot.createdAt,
  //       updatedAt: spot.updatedAt,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'An error occurred while updating the spot.' });
  //   }
  // });


  //DELET a spot
  router.delete('/:spotId',requireAuth, handleValidationErrors, async (req, res) => {
    const { spotId } = req.params;

    try {
      // Find the spot by spotId
      const spot = await Spot.findByPk(spotId);

      // If the spot doesn't exist, return a 404 error
      if (!spot) {
        return res.status(404).json({ error: 'Spot not found' });
      }

      // Delete the spot
      await spot.destroy();

      // Return a success message
      return res.status(200).json({ message: 'Spot successfully deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while deleting the spot.' });
    }
  });

  // // POST route to create a review for a specific spot
  // router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  //   try {
  //     // Get spotId from request parameters and review data from the body
  //     const { spotId } = req.params;
  //     const { review, stars } = req.body;



  //     // Check if the spot exists in the database
  //     const spot = await Spot.findByPk(spotId);
  //     if (!spot) {
  //       return res.status(404).json({ message: 'Spot not found' });
  //     }


  //     // Assuming you have some method to get the logged-in user (e.g., through a middleware)
  //     const userId = req.user.id;  // If you're using an authenticated user, otherwise set to a test user or from session

  //     // Check if the user has already left a review for this spot
  //     // const existingReview = await Review.findOne({
  //     //   where: {
  //     //     spotId: spotId,
  //     //     userId: user.id,
  //     //   },
  //     // });

  //     // if (existingReview) {
  //     //   return res.status(403).json({
  //     //     message: 'User already has a review for this spot.',
  //     //   });
  //     // }



  //     // Create a new review
  //     const newReview = await Review.create({
  //       userId,        // Set the userId (from the logged-in user)
  //       spotId,        // Set the spotId (from the URL)
  //       review,        // The review text
  //       stars,         // The star rating (1-5)
  //     });

  //     return res.status(201).json(newReview); // Return the created review
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(400).json({ message: 'Bad Request'});
  //   }
  // });

module.exports = router;
