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
        url: 'https://media.istockphoto.com/id/1136437406/photo/san-francisco-skyline-with-oakland-bay-bridge-at-sunset-california-usa.jpg', // URL for the spot image
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
      },
      {
          spotId: 1,
          url: 'https://media.istockphoto.com/id/1136437406/photo/san-francisco-skyline-with-oakland-bay-bridge-at-sunset-california-usa.jpg',
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          url: 'https://media.istockphoto.com/id/1204114267/photo/san-francisco-downtown.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          url: 'https://media.istockphoto.com/id/1144986138/photo/modern-office-building-in-san-francisco.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          url: 'https://media.istockphoto.com/id/1284944135/photo/san-francisco-skyline-with-fog.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          url: 'https://media.istockphoto.com/id/157401568/photo/golden-gate-bridge-san-francisco-california.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Spot 3: Hidden Cabin in the Redwoods
        {
          spotId: 3,
          url: 'https://media.istockphoto.com/id/1367190191/photo/redwood-cabin.jpg',
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          url: 'https://media.istockphoto.com/id/1322155734/photo/wooden-cabin-in-the-forest.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          url: 'https://media.istockphoto.com/id/1431207640/photo/inside-rustic-cabin.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          url: 'https://media.istockphoto.com/id/1478416537/photo/misty-redwoods-trail.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          url: 'https://media.istockphoto.com/id/1322157825/photo/porch-of-a-log-cabin.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Spot 4: Rooftop Loft Overlooking the River
        {
          spotId: 4,
          url: 'https://media.istockphoto.com/id/1181276352/photo/rooftop-loft-with-city-view.jpg',
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 4,
          url: 'https://media.istockphoto.com/id/1258183457/photo/modern-loft-apartment.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 4,
          url: 'https://media.istockphoto.com/id/1358436345/photo/urban-loft-with-large-windows.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 4,
          url: 'https://media.istockphoto.com/id/1408127395/photo/city-skyline-from-rooftop.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 4,
          url: 'https://media.istockphoto.com/id/1264509823/photo/river-view-from-loft-balcony.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Spot 5: Desert Adobe Casita
        {
          spotId: 5,
          url: 'https://media.istockphoto.com/id/1239182739/photo/adobe-house-in-the-desert.jpg',
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 5,
          url: 'https://media.istockphoto.com/id/1356315721/photo/sunset-over-the-desert.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 5,
          url: 'https://media.istockphoto.com/id/1406341845/photo/adobe-home-with-cactus-garden.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 5,
          url: 'https://media.istockphoto.com/id/1183768347/photo/southwest-style-home.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 5,
          url: 'https://media.istockphoto.com/id/1476032459/photo/starry-night-over-adobe-house.jpg',
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
