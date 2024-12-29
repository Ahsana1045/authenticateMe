// routes/api/spots.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

// Route to get all spots
router.get('/', async (req, res) => {
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
            ]
            // ,
            // include: [
            //     {
            //         model: Review,
            //         attributes: [], // Include no review attributes directly
            //         required: false
            //     },
            //     {
            //         model: SpotImage,
            //         attributes: ['url'], // Include preview image URLs
            //         where: { preview: true },
            //         required: false, // If no preview image exists, still return the spot
            //     },
            // ],
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
                // avgRating: avgRating ? Number(avgRating.toFixed(1)) : null,
                // previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
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

//GETs spot details by spotId:
router.get('/:spotId', async (req, res) => {
    try {
        const { spotId } = req.params;

        // Find the spot by ID
        const spot = await Spot.findOne({
            where: { id: spotId },
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
            ]
            // Include associations like SpotImages or Reviews if needed
            // include: [{ model: SpotImage }, { model: Review }]
        });

        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        res.status(200).json(spot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the spot details.' });
    }
});

//CREATE a spot:
router.post('/', requireAuth, async (req, res) => {
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
                message: "All fields are required to create a spot."
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
        res.status(500).json({ error: 'An error occurred while creating the spot.' });
    }
});

// Add an image to a spot based on its ID
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    try {
        const { spotId } = req.params;
        const { url, preview } = req.body;

        // Find the spot by ID
        const spot = await Spot.findByPk(spotId);

        // If the spot doesn't exist, return a 404 error
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        // Check if the authenticated user is the owner of the spot
        if (spot.ownerId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You do not own this spot' });
        }

        // Create the image for the spot
        const newImage = await SpotImage.create({
            spotId,
            url,
            preview: preview || false // Default to `false` if preview is not specified
        });

        // Format and send the response
        res.status(201).json({
            id: newImage.id,
            url: newImage.url,
            preview: newImage.preview
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
