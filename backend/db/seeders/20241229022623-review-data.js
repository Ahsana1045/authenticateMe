'use strict';
/** @type {import('sequelize-cli').Migration} */
require('dotenv').config();

const { Review } = require('../models');
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 2,
        spotId: 1,
        review: 'What a great place to stay. We would recomend',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
          userId: 3,
          spotId: 1,
          review: "Amazing location with stunning views! Highly recommend.",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Reviews for Spot 2
        {
          userId: 1,
          spotId: 2,
          review: "Very cozy and well-maintained. Had a great stay!",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          spotId: 2,
          review: "The place was nice, but the check-in process was a bit confusing.",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Reviews for Spot 3
        {
          userId: 3,
          spotId: 3,
          review: "Absolutely loved the secluded vibe. Perfect for a getaway.",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          spotId: 3,
          review: "Cabin was clean and peaceful. Would visit again!",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Reviews for Spot 4
        {
          userId: 1,
          spotId: 4,
          review: "The rooftop view was breathtaking! Great experience.",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          spotId: 4,
          review: "Nice loft, but a bit noisy at night due to the location.",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Reviews for Spot 5
        {
          userId: 3,
          spotId: 5,
          review: "The desert scenery was unreal! Would love to come back.",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          spotId: 5,
          review: "Beautiful place, but it gets really hot during the day.",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Reviews for Spot 6
        {
          userId: 1,
          spotId: 6,
          review: "Perfect place for a quiet retreat. Loved the lake!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          spotId: 6,
          review: "Enjoyed the stay, but the Wi-Fi was a bit slow.",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Reviews for Spot 7
        {
          userId: 3,
          spotId: 7,
          review: "Much calmer than the usual Vegas scene. Great stay!",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          spotId: 7,
          review: "Nice spot away from the Strip. Comfortable and quiet.",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Reviews for Spot 8
        {
          userId: 1,
          spotId: 8,
          review: "Absolutely stunning location! Would book again.",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          spotId: 8,
          review: "Great place, but parking was a bit of a hassle.",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1] }
    }, null);
  }
};



///OLDERRRRR
// module.exports = {
//   async up (queryInterface, Sequelize) {

//     await Review.bulkCreate([
//       {
//         userId: 1,
//         spotId: 1,
//         review: 'What a great movie!',
//         stars: 5,
//       }
//     ], { validate: true });
//   },

//   async down (queryInterface, Sequelize) {
//     options.tableName = 'Reviews';
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete(options, {
//       userId: { [Op.in]: [1] }
//     }, {});
//   }
// };
