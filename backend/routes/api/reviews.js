// routes/api/reviews.js

const express = require('express');
const router = express.Router();


const { User } = require('../../db/models');
const { Spot, Review, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

router.get('/current', requireAuth, async (req, res) => {
    try {
        const { user } = req
        const reviews = await Review.findAll({
            where: {userId: user.id},
            attributes: [
                'id',
                'userId',
                'spotId',
                'review',
                'stars',
                'createdAt',
                'updatedAt'
            ],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching reviews.'})
    }


});

module.exports = router;