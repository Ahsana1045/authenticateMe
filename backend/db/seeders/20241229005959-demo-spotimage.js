'use strict';
require('dotenv').config();

const { SpotImage } = require('../models');
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

// const spotimage = require("../models/spotimage");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "SpotImages"
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1, // The ID of the spot associating this image w
        url: 'https://example1.com/spot-image.jpg', // URL for the spot image
        preview: true, // Whether this is the preview image
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://example2.com/another-spot-image.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2] }
    }, null);
  }
};
