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
const { ReviewImages } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { getSpots } = require('../../routes/controllers/spotController')

//GET SPOTS WITH FILTER

// GET /api/spots

router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      size = 20,
      maxLat,
      minLat,
      maxLng,
      minLng,
      minPrice,
      maxPrice
    } = req.query;

    // Validation for query parameters
    const errors = {};
    if (page && (isNaN(page) || parseInt(page) < 1)) {
      errors.page = "Page must be greater than or equal to 1";
    }
    if (size && (isNaN(size) || parseInt(size) < 1)) {
      errors.size = "Size must be greater than or equal to 1";
    }
    if (minPrice && (isNaN(minPrice) || parseFloat(minPrice) < 0)) {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    }
    if (maxPrice && (isNaN(maxPrice) || parseFloat(maxPrice) < 0)) {
      errors.maxPrice = "Maximum price must be greater than or equal to 0";
    }
    if (minLat && (isNaN(minLat) || parseFloat(minLat) < -90 || parseFloat(minLat) > 90)) {
      errors.minLat = "Minimum latitude must be between -90 and 90";
    }
    if (maxLat && (isNaN(maxLat) || parseFloat(maxLat) < -90 || parseFloat(maxLat) > 90)) {
      errors.maxLat = "Maximum latitude must be between -90 and 90";
    }
    if (minLng && (isNaN(minLng) || parseFloat(minLng) < -180 || parseFloat(minLng) > 180)) {
      errors.minLng = "Minimum longitude must be between -180 and 180";
    }
    if (maxLng && (isNaN(maxLng) || parseFloat(maxLng) < -180 || parseFloat(maxLng) > 180)) {
      errors.maxLng = "Maximum longitude must be between -180 and 180";
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ message: "Bad Request", errors });
    }

    // Pagination calculations
    const offset = (parseInt(page) - 1) * parseInt(size);
    const limit = parseInt(size);

    // Building query filters
    const where = {};
    if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
    if (minLat) where.lat = { ...where.lat, [Op.gte]: parseFloat(minLat) };
    if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
    if (minLng) where.lng = { ...where.lng, [Op.gte]: parseFloat(minLng) };
    if (minPrice) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

    // Fetching spots
    const spots = await Spot.findAll({
      where,
      limit,
      offset,
      include: [
        { model: User, as: 'owner' },
        {
          model: SpotImage,
          as: 'SpotImages',
          attributes: ['url'],
          where: { preview: true },
          required: false,
        },
        {
          model: Review,
          as: 'reviews',
          attributes: [],
          required: false,
        },
      ],
    });

    // Formatting the results
    const formattedSpots = spots.map((spot) => {
      const avgRating = spot.reviews?.length
        ? spot.reviews.reduce((sum, review) => sum + review.stars, 0) / spot.reviews.length
        : null;

      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: Number(spot.lat),
        lng: Number(spot.lng),
        name: spot.name,
        description: spot.description,
        price: parseFloat(spot.price),
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: avgRating ? parseFloat(avgRating.toFixed(1)) : null,
        previewImage: spot.SpotImages?.length > 0 ? spot.SpotImages[0].url : null,
      };
    });

    res.status(200).json({ Spots: formattedSpots, page: parseInt(page), size: parseInt(size) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching spots." });
  }
});


//OLDER 1/10 11:36
// router.get('/', async (req, res) => {
//   try {
//     const { page = 1, size = 20, maxLat, minLat, maxLng, minLng, minPrice, maxPrice } = req.query;

//     // Validation for query parameters
//     const errors = {};
//     if (page && (isNaN(page) || parseInt(page) < 1)) errors.page = "Page must be greater than or equal to 1";
//     if (size && (isNaN(size) || parseInt(size) < 1)) errors.size = "Size must be greater than or equal to 1";
//     if (minPrice && (isNaN(minPrice) || parseFloat(minPrice) < 0)) errors.minPrice = "Minimum price must be greater than or equal to 0";
//     if (maxPrice && (isNaN(maxPrice) || parseFloat(maxPrice) < 0)) errors.maxPrice = "Maximum price must be greater than or equal to 0";
//     if (minLat && (isNaN(minLat) || !Number.isInteger(parseFloat(minLat)))) errors.minLat = "Minimum latitude is invalid";
//     if (maxLat && (isNaN(maxLat) || !Number.isInteger(parseFloat(maxLat)))) errors.maxLat = "Maximum latitude is invalid";
//     if (minLng && (isNaN(minLng) || !Number.isInteger(parseFloat(minLng)))) errors.minLng = "Minimum longitude is invalid";
//     if (maxLng && (isNaN(maxLng) || !Number.isInteger(parseFloat(maxLng)))) errors.maxLng = "Maximum longitude is invalid";

//     if (Object.keys(errors).length) {
//       return res.status(400).json({ message: "Bad Request", errors });
//     }

//     // Querying spots with filters
//     const offset = (page - 1) * size;
//     const where = {};

//     if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
//     if (minLat) where.lat = { ...where.lat, [Op.gte]: parseFloat(minLat) };
//     if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
//     if (minLng) where.lng = { ...where.lng, [Op.gte]: parseFloat(minLng) };
//     if (minPrice) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
//     if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

//     const spots = await Spot.findAll({
//       where,
//       limit: parseInt(size),
//       offset,
//       include: [
//         { model: User, as: 'owner' },
//         {
//           model: SpotImage,
//           as: 'SpotImages',
//           attributes: ['url'],
//           where: { preview: true }, // Include only preview images
//           required: false,
//         },
//         {
//           model: Review,
//           as: 'reviews',
//           attributes: [],
//           required: false,
//         },
//       ],
//     });

//     // // Map the results to include avgRating and previewImage
//     // const formattedSpots = spots.map((spot) => {
//     //   const avgRating = spot.Reviews
//     //     ? spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length
//     //     : null;



//     //   return {
//     //     id: spot.id,
//     //     ownerId: spot.ownerId,
//     //     address: spot.address,
//     //     city: spot.city,
//     //     state: spot.state,
//     //     country: spot.country,
//     //     lat: Number(spot.lat),
//     //     lng: Number(spot.lng),
//     //     name: spot.name,
//     //     description: spot.description,
//     //     price: spot.price,
//     //     createdAt: spot.createdAt,
//     //     updatedAt: spot.updatedAt,
//     //     avgRating: avgRating ? Number(avgRating.toFixed(1)) : null,
//     //     previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
//     //   };
//     // });

//     // Map the results to include avgRating and previewImage
// const formattedSpots = spots.map((spot) => {
//   const avgRating = spot.Reviews
//     ? spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length
//     : null;

//   // Ensure lat and lng are numbers
//   const lat = spot.lat ? Number(spot.lat) : null;  // Changed this line
//   const lng = spot.lng ? Number(spot.lng) : null;  // Changed this line

//   return {
//     id: spot.id,
//     ownerId: spot.ownerId,
//     address: spot.address,
//     city: spot.city,
//     state: spot.state,
//     country: spot.country,
//     lat,  // Using the converted lat value
//     lng,  // Using the converted lng value
//     name: spot.name,
//     description: spot.description,
//     price: spot.price,
//     createdAt: spot.createdAt,
//     updatedAt: spot.updatedAt,
//     avgRating: avgRating ? Number(avgRating.toFixed(1)) : null,
//     previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
//   };
// });


//     res.status(200).json({ Spots: formattedSpots, page: parseInt(page), size: parseInt(size) });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred while fetching spots." });
//   }
// });

// module.exports = router;




// router.get('/', async (req, res) => {
//   try {
//     const {
//       minPrice,
//       maxPrice,
//       minLat,
//       maxLat,
//       minLng,
//       maxLng,
//       page = 1,
//       size = 20,
//     } = req.query;

//     // Validation function
//     const validateQueryParameters = () => {
//       const errors = {};

//       if (page < 1) errors.page = 'Page must be greater than or equal to 1';
//       if (size < 1) errors.size = 'Size must be greater than or equal to 1';

//       if (minLat && isNaN(parseFloat(minLat))) errors.minLat = 'Minimum latitude is invalid';
//       if (maxLat && isNaN(parseFloat(maxLat))) errors.maxLat = 'Maximum latitude is invalid';
//       if (minLng && isNaN(parseFloat(minLng))) errors.minLng = 'Minimum longitude is invalid';
//       if (maxLng && isNaN(parseFloat(maxLng))) errors.maxLng = 'Maximum longitude is invalid';

//       if (minPrice && isNaN(parseFloat(minPrice))) errors.minPrice = 'Minimum price must be greater than or equal to 0';
//       if (maxPrice && isNaN(parseFloat(maxPrice))) errors.maxPrice = 'Maximum price must be greater than or equal to 0';

//       return errors;
//     };

//     const errors = validateQueryParameters();
//     if (Object.keys(errors).length > 0) {
//       return res.status(400).json({ message: 'Bad Request', errors });
//     }

//     // Calculate offset for pagination
//     const offset = (page - 1) * size;

//     // Build the where clause for filters
//     const where = {};

//     if (minPrice !== undefined) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
//     if (maxPrice !== undefined) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
//     if (minLat !== undefined) where.lat = { ...where.lat, [Op.gte]: parseFloat(minLat) };
//     if (maxLat !== undefined) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
//     if (minLng !== undefined) where.lng = { ...where.lng, [Op.gte]: parseFloat(minLng) };
//     if (maxLng !== undefined) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };

//     // Fetch the total count of spots
//     const { count, rows: spots } = await Spot.findAndCountAll({
//       where,
//       include: [
//         { model: User, as: 'owner' },
//         {
//           model: SpotImage,
//           as: 'SpotImages',
//           attributes: ['url'],
//           where: { preview: true },
//           required: false,
//         },
//         {
//           model: Review,
//           as: 'reviews',
//           attributes: [],
//           required: false,
//         }
//       ],
//       limit: size,
//       offset: offset,
//     });

//     // Map results to include avgRating and previewImage
//     const formattedSpots = spots.map((spot) => {
//       const avgRating = spot.Reviews
//         ? spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length
//         : null;

//       return {
//         id: spot.id,
//         ownerId: spot.ownerId,
//         address: spot.address,
//         city: spot.city,
//         state: spot.state,
//         country: spot.country,
//         lat: spot.lat,
//         lng: spot.lng,
//         name: spot.name,
//         description: spot.description,
//         price: spot.price,
//         createdAt: spot.createdAt,
//         updatedAt: spot.updatedAt,
//         avgRating: avgRating ? Number(avgRating.toFixed(1)) : null,
//         previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
//       };
//     });

//     // Response with pagination info
//     res.status(200).json({
//       Spots: formattedSpots,
//       page: Number(page),
//       size: Number(size),
//       totalSpots: count,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching spots.' });
//   }
// });





// router.get('/', async (req, res) => {
//   try {
//     const {
//       minPrice,
//       maxPrice,
//       minLat,
//       maxLat,
//       minLng,
//       maxLng,
//       page = 1,
//       size = 20, // Default to 20 items per page
//     } = req.query;

//     // Calculate offset for pagination
//     const offset = (page - 1) * size;

//     // Build the where clause for filters
//     const where = {};

//     if (minPrice !== undefined) where.price = { ...where.price, [Op.gte]: parseFloat(minPrice) };
//     if (maxPrice !== undefined) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };
//     if (minLat !== undefined) where.lat = { ...where.lat, [Op.gte]: parseFloat(minLat) };
//     if (maxLat !== undefined) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
//     if (minLng !== undefined) where.lng = { ...where.lng, [Op.gte]: parseFloat(minLng) };
//     if (maxLng !== undefined) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };

//     // Fetch the total count of spots
//     const { count, rows: spots } = await Spot.findAndCountAll({
//       where,
//       include: [
//         { model: User, as: 'owner' },
//         {
//           model: SpotImage,
//           as: 'SpotImages',
//           attributes: ['url'],
//           where: { preview: true },
//           required: false,
//         },
//         {
//           model: Review,
//           as: 'reviews',
//           attributes: [],
//           required: false,
//         }
//       ],
//       limit: size,
//       offset: offset,
//     });

//     // Map results to include avgRating and previewImage
//     const formattedSpots = spots.map((spot) => {
//       const avgRating = spot.Reviews
//         ? spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length
//         : null;

//       return {
//         id: spot.id,
//         ownerId: spot.ownerId,
//         address: spot.address,
//         city: spot.city,
//         state: spot.state,
//         country: spot.country,
//         lat: spot.lat,
//         lng: spot.lng,
//         name: spot.name,
//         description: spot.description,
//         price: spot.price,
//         createdAt: spot.createdAt,
//         updatedAt: spot.updatedAt,
//         avgRating: avgRating ? Number(avgRating.toFixed(1)) : null,
//         previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
//       };
//     });

//     // Response with pagination info
//     res.status(200).json({
//       Spots: formattedSpots,
//       page: Number(page),
//       size: Number(size),
//       totalSpots: count,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching spots.' });
//   }
// });


// // Route to get all spots
// router.get('/', async (req, res) => {
//   try {
//       const spots = await Spot.findAll({
//           // attributes: [
//           //     'id',
//           //     'ownerId',
//           //     'address',
//           //     'city',
//           //     'state',
//           //     'country',
//           //     'lat',
//           //     'lng',
//           //     'name',
//           //     'description',
//           //     'price',
//           //     'avgRating',
//           //     'previewImage',
//           //     'createdAt',
//           //     'updatedAt'
//           // ],
//           include: [
//               {model: User, as: 'owner'},

//               {
//                   model: SpotImage,
//                   as:'SpotImages',
//                   attributes: ['url'],
//                   where: { preview: true }, // Include only preview images
//                   required: false, // If no preview image exists, still return the spot
//               },
//               {
//                   model: Review,
//                   as: 'reviews',
//                   attributes: [],
//                   required: false, // If no reviews exist, still return the spot
//               }
//           ],
//       });

//       // Map the results to include avgRating and previewImage
//       const formattedSpots = spots.map((spot) => {
//           const avgRating = spot.Reviews
//               ? spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length
//               : null;

//           return {
//               id: spot.id,
//               ownerId: spot.ownerId,
//               address: spot.address,
//               city: spot.city,
//               state: spot.state,
//               country: spot.country,
//               lat: spot.lat,
//               lng: spot.lng,
//               name: spot.name,
//               description: spot.description,
//               price: spot.price,
//               createdAt: spot.createdAt,
//               updatedAt: spot.updatedAt,
//               avgRating: avgRating ? Number(avgRating.toFixed(1)) : null,
//               previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
//           };
//       });

//       res.status(200).json({ Spots: formattedSpots });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while fetching spots.' });
//   }
// });

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
        let errors = {};
        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (!country) errors.country = 'Country is required';
        if (!lat) errors.lat = 'Latitude is required';
        if (!lng) errors.lng = 'Longitude is required';
        if (!name) errors.name = 'Name is required';
        if (!description) errors.description = 'Description is required';
        if (!price) errors.price = 'Price is required';

        // If there are validation errors, return 400 with detailed error messages
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: "Validation Error",
                errors: errors
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
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// GET all reviews by spotId:
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params; // Extract spotId from URL params

  try {
    // Fetch all reviews for the given spotId
    const reviews = await Review.findAll({
      where: { spotId },
      attributes: [
        'id',
        'userId',
        'spotId',
        'review',
        'stars',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: User,
          as: 'user', // Include user information (e.g., name) for each review
          attributes: ['id', 'firstName', 'lastName'], // Customize the attributes to return for the user
        },
        {
          model: ReviewImages,
          as: 'ReviewImages', // Include review images information for each review
          attributes: ['id', 'url'],
        },
      ],
    });

    // If no reviews found, return a message
    if (reviews.length === 0) {
      return res.status(404).json({ message: "Spot couldn\'t be found" });
    }

    // Format the reviews according to the API docs
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: {
        id: review.user.id,
        firstName: review.user.firstName,
        lastName: review.user.lastName,
      },
      ReviewImages: review.ReviewImages.map(image => ({
        id: image.id,
        url: image.url,
      })),
    }));

    // Return the reviews wrapped in an object
    return res.status(200).json({ Reviews: formattedReviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ error: 'An error occurred while retrieving reviews.' });
  }
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  try {
    // Get spotId from request parameters and review data from the body
    const { spotId } = req.params;
    const { review, stars } = req.body;

    // Input validation
    if (!review || !stars) {
      return res.status(400).json({
        message: "Validation error",
        errors: {
          review: "Review text is required",
          stars: "Stars must be an integer from 1 to 5"
        }
      });
    }

    // Check if the spot exists in the database
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
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

    // Fetch the created review with included user info
    const createdReview = await Review.findByPk(newReview.id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName']
      }
    });

    return res.status(201).json(createdReview); // Return the created review with user info
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
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

  // Route to EDIT A SPOT:

router.put('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const userId = req.user.id;

  // Validate required fields
  let errors = {};
  if (!address) errors.address = 'Street address is required';
  if (!city) errors.city = 'City is required';
  if (!state) errors.state = 'State is required';
  if (!country) errors.country = 'Country is required';
  if (lat === undefined || lat === null) errors.lat = 'Latitude is not valid';
  if (lng === undefined || lng === null) errors.lng = 'Longitude is not valid';
  if (!name || name.length > 50) errors.name = 'Name must be less than 50 characters';
  if (!description) errors.description = 'Description is required';
  if (price === undefined || price === null || price < 0) errors.price = 'Price per day is required';

  // If there are validation errors, return 400 with detailed error messages
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Validation Error",
      errors: errors
    });
  }

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

  //DELET a spot

  router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;

    try {
      // Find the spot by spotId
      const spot = await Spot.findByPk(spotId);

      // If the spot doesn't exist, return a 404 error
      if (!spot) {
        return res.status(404).json({ message: 'Spot couldn\'t be found' });
      }

      // Check if the authenticated user
      if (spot.ownerId !== userId) {
        return res.status(403).json({ message: 'Forbidden: You are not the owner of this spot' });
      }

      // Delete spot
      await spot.destroy();

      // Return a success message
      return res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error', error: 'An error occurred while deleting the spot.' });
    }
  });

module.exports = router;
