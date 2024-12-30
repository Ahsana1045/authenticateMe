// Import necessary modules
const express = require('express');
const router = express.Router();

// Import your models
const { SpotImage } = require('../../db/models');

// DELETE route to remove a review image by imageId
router.delete('/:imageId', async (req, res) => {
    const { imageId } = req.params;

    try {
        // Find the image by imageId
        const image = await SpotImage.findByPk(imageId);

        // If the image doesn't exist, return a 404 error
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        // Delete the image
        await image.destroy();

        // Return a success message
        return res.status(200).json({ message: "Image successfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while deleting the image" });
    }
});

module.exports = router;
