const express = require('express');
const router = express.Router();
const { ReviewImages, Review } = require('../../db/models');

// DELETE route to remove a review image by imageId
router.delete('/:imageId', async (req, res) => {
    const { imageId } = req.params;

    try {
        // Mock user authentication by setting req.user (for testing purposes)
        const userId = req.user ? req.user.id : null; // Replace with the actual userId you want to test with

        if (!userId) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Find the image by imageId
        const image = await ReviewImages.findByPk(imageId);

        if (!image) {
            return res.status(404).json({ message: "Review Image couldn't be found" });
        }

        // Find the review associated with the image
        const review = await Review.findByPk(image.reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review couldn't be found" });
        }

        // Check if the authenticated user is the owner of the review
        if (review.userId !== userId) {
            return res.status(403).json({ message: "Forbidden: You do not own this review image" });
        }

        // Delete the image
        await image.destroy();

        // Return a success message
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        console.error('Error while deleting image:', error);
        return res.status(500).json({ error: "An error occurred while deleting the image" });
    }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { ReviewImages, Review } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth');

// // DELETE route to remove a review image by imageId
// router.delete('/:imageId', async (req, res) => {
//     const { imageId } = req.params;

//     try {
//         // Log the incoming request for debugging
//         console.log(`Received request to delete image with ID: ${imageId}`);

//         // Mock user authentication by setting req.user (for testing purposes)
//         const userId = 1; // Replace with the actual userId you want to test with
//         req.user = { id: userId };

//         // Find the image by imageId
//         const image = await ReviewImages.findByPk(imageId);

//         if (!image) {
//             console.log('Image not found');
//             return res.status(404).json({ message: "Review Image couldn't be found" });
//         }

//         console.log('Image found:', image);

//         // Find the review associated with the image
//         const review = await Review.findByPk(image.reviewId);

//         if (!review) {
//             console.log('Review not found');
//             return res.status(404).json({ message: "Review couldn't be found" });
//         }

//         console.log('Review found:', review);

//         // Check if the authenticated user is the owner of the review
//         if (review.userId !== req.user.id) {
//             console.log('User not authorized');
//             return res.status(403).json({ message: "Forbidden: You do not own this review image" });
//         }

//         console.log('User authorized');

//         // Delete the image
//         await image.destroy();

//         console.log('Image successfully deleted');

//         // Return a success message
//         return res.status(200).json({ message: "Successfully deleted" });
//     } catch (error) {
//         console.error('Error while deleting image:', error);
//         return res.status(500).json({ error: "An error occurred while deleting the image" });
//     }
// });

// module.exports = router;


// // DELETE route to remove a review image by imageId
// router.delete('/:imageId', requireAuth, async (req, res) => {
//     const { imageId } = req.params;

//     try {
//         // Log the incoming request for debugging
//         console.log(`Received request to delete image with ID: ${imageId}`);

//         // Find the image by imageId
//         const image = await ReviewImages.findByPk(imageId);

//         if (!image) {
//             console.log('Image not found');
//             return res.status(404).json({ message: "Review Image couldn't be found" });
//         }

//         console.log('Image found:', image);

//         // Find the review associated with the image
//         const review = await Review.findByPk(image.reviewId);

//         if (!review) {
//             console.log('Review not found');
//             return res.status(404).json({ message: "Review couldn't be found" });
//         }

//         console.log('Review found:', review);

//         // Check if the authenticated user is the owner of the review
//         if (review.userId !== req.user.id) {
//             console.log('User not authorized');
//             return res.status(403).json({ message: "Forbidden: You do not own this review image" });
//         }

//         console.log('User authorized');

//         // Delete the image
//         await image.destroy();

//         console.log('Image successfully deleted');

//         // Return a success message
//         return res.status(200).json({ message: "Successfully deleted" });
//     } catch (error) {
//         console.error('Error while deleting image:', error);
//         return res.status(500).json({ error: "An error occurred while deleting the image" });
//     }
// });

// module.exports = router;


// / const express = require('express');
// const router = express.Router();
// const { SpotImage } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth')

// // DELETE route to remove a review image by imageId
// router.delete('/:imageId', async (req, res) => {
//     const { imageId } = req.params;

//     try {
//         // Find the image by imageId
//         const image = await SpotImage.findByPk(imageId);

//         // If the image doesn't exist, return a 404 error
//         if (!image) {
//             return res.status(404).json({ message: "Image not found" });
//         }

//         // Delete the image
//         await image.destroy();

//         // Return a success message
//         return res.status(200).json({ message: "Image successfully deleted" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "An error occurred while deleting the image" });
//     }
// });

// module.exports = router;
