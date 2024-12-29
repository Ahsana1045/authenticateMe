// routes/api/reviews.js

const express = require('express');
const router = express.Router();


const { User } = require('../../db/models');
const { Spot, Review, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')

router.get('/current', requireAuth, async (req, res) => {
    try {
        const reviews = await Review.findAll({
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
    }
});
