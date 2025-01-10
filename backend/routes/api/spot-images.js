const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');

const router = express.Router();

// DELETE /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
  try {
    const { imageId } = req.params;

    // Find the spot image by its ID
    const spotImage = await SpotImage.findByPk(imageId);

    // If the spot image doesn't exist, return a 404 error
    if (!spotImage) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    // Find the associated spot to check ownership
    const spot = await Spot.findByPk(spotImage.spotId);

    // If the current user is not the owner of the spot, return a 403 error
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this spot image" });
    }

    // Delete the spot image
    await spotImage.destroy();

    // Respond with a success message
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
