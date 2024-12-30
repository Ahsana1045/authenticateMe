'use strict';

const spotimage = require("../models/spotimage");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1, // The ID of the spot you're associating this image with
        url: 'https://example.com/spot-image.jpg', // URL for the spot image
        preview: true, // Whether this is the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://example.com/another-spot-image.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
