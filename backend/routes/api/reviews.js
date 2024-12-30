// routes/api/reviews.js

const express = require('express');
const router = express.Router();


const { User } = require('../../db/models');
const { Spot, Review, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// Route to get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {
    try {
        const { user } = req; // Get the authenticated user (from requireAuth middleware)

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized access.' });
        }

        // Fetch reviews by the current user
        const reviews = await Review.findAll({
            where: { userId: user.id }, // Make sure the userId matches the authenticated user
            include: [
                {
                    model: Spot, // Include the spot associated with the review
                    as: 'spot', // Ensure to use the alias from the model definition
                    attributes: ['id', 'name', 'address', 'city', 'state', 'country'], // Only include necessary attributes
                },
            ],
        });

        // If no reviews are found
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this user.' });
        }

        // Format the reviews
        const formattedReviews = reviews.map((review) => {
            return {
                id: review.id,
                userId: review.userId,
                spotId: review.spotId,
                spotName: review.spot.name, // Access the spot's name from the associated model
                stars: review.stars,
                review: review.review,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
            };
        });

        // Return the formatted reviews
        res.status(200).json({ Reviews: formattedReviews });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching reviews.' });
    }
});

// Route to add an image URL to a review
router.post('/:reviewId/images', async (req, res) => {
    try {
      const { reviewId } = req.params;  // Get reviewId from the URL parameter
      const { url } = req.body;  // Get imageUrl from the request body

      if (!url) {
        return res.status(400).json({ error: 'Image URL is required.' });
      }

      // Find the review by ID
      const review = await Review.findByPk(reviewId);

      if (!review) {
        return res.status(404).json({ error: 'Review not found.' });
      }

      // Update the review with the new image URL
      review.url = url;
      await review.save();

      // Respond with the updated review data
      return res.status(200).json({
        id: review.id,
        url: review.url,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while adding the image.' });
    }
  });



module.exports = router;
//GET all Reiveiws by Spotid:
// Route to get all reviews for a specific spot
// router.get('/:spotId/reviews', async (req, res) => {
//     const { spotId } = req.params; // Extract spotId from URL params

//     try {
//       // Fetch all reviews for the given spotId
//       const reviews = await Review.findAll({
//         where: { spotId },
//         include: [
//           {
//             model: User,
//             as: 'user', // Include user information (e.g., name) for each review
//             attributes: ['id', 'firstName', 'lastName'], // Customize the attributes to return for the user
//           },
//           {
//             model: Spot,
//             as: 'spot', // Include spot information (e.g., name) for each review (optional)
//             attributes: ['id', 'name'],
//           },
//         ],
//       });

//       // If no reviews found, return a message
//       if (reviews.length === 0) {
//         return res.status(404).json({ message: 'No reviews found for this spot' });
//       }

//       // Return the reviews in the response
//       return res.status(200).json(reviews);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'An error occurred while retrieving reviews.' });
//     }
//   });

// Route for creating review










// router.get('/current', requireAuth, async (req, res) => {
//     try {
//         const { user } = req; // Get the authenticated user (from requireAuth middleware)

//         if (!user) {
//             return res.status(401).json({ error: 'Unauthorized access.' });
//         }

//         // Fetch reviews by the current user
//         const reviews = await Review.findAll({
//             where: { userId: user.id }, // Make sure your Review model has a userId column
//             include: [
//                 {
//                     model: Spot, // Include the spot associated with the review
//                     attributes: ['id', 'name', 'address', 'city', 'state', 'country'], // Only include necessary attributes
//                 },
//             ],
//         });

//         // If no reviews are found
//         if (!reviews || reviews.length === 0) {
//             return res.status(404).json({ message: 'No reviews found for this user.' });
//         }

//         // Format the reviews
//         const formattedReviews = reviews.map((review) => {
//             return {
//                 id: review.id,
//                 spotId: review.spotId,
//                 spotName: review.Spot.name, // Assuming the review includes a spot association
//                 rating: review.rating,
//                 comment: review.comment,
//                 createdAt: review.createdAt,
//                 updatedAt: review.updatedAt,
//             };
//         });

//         // Return the formatted reviews
//         res.status(200).json({ Reviews: formattedReviews });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching reviews.' });
//     }
// });

// module.exports = router;


// router.get('/current', requireAuth, async (req, res) => {
//     try {
//         const { user } = req
//         const reviews = await Review.findAll({
//             where: {userId: user.id},
//             attributes: [
//                 'id',
//                 'userId',
//                 'spotId',
//                 'review',
//                 'stars',
//                 'createdAt',
//                 'updatedAt'
//             ],
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while fetching reviews.'})
//     }


// });

// module.exports = router;
