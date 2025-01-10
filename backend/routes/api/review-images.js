const express = require('express');
const router = express.Router();
const { ReviewImages, Review } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');

// DELETE route to remove a review image by imageId
router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
    const { imageId } = req.params;

    try {
        const image = await ReviewImages.findByPk(imageId);

        if (!image) {
            return res.status(404).json({ message: "Review Image couldn't be found" });
        }

        const review = await Review.findByPk(image.reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review couldn't be found" });
        }

        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden: You do not own this review image" });
        }

        await image.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the image" });
    }
});

module.exports = router;
