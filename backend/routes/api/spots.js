// routes/api/spots.js

const express = require('express');
const router = express.Router();


const { User } = require('../../db/models');
const { Spot, Review, SpotImage } = require('../../db/models');

// Route to get all spots
router.get('/spots', async (req, res) => {
    try {
        const spots = await Spot.findAll({
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
                'createdAt',
                'updatedAt'
            ],
            include: [
                {
                    model: Review,
                    attributes: [], // Include no review attributes directly
                },
                {
                    model: SpotImage,
                    attributes: ['url'], // Include preview image URLs
                    where: { preview: true },
                    required: false, // If no preview image exists, still return the spot
                },
            ],
        });

        // Map the results to include avgRating and previewImage
        const formattedSpots = spots.map((spot) => {
            const avgRating = spot.Reviews
                ? spot.Reviews.reduce((sum, review) => sum + review.rating, 0) /
                  spot.Reviews.length
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

module.exports = router;
