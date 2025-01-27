'use strict';
require('dotenv').config();

const { Spot } = require('../models');
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1, // Ensure this matches a seeded user ID
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 123.45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '12 choram',
        city: 'New Jersey',
        state: 'NY',
        country: 'United States of America',
        lat: 50.7645358,
        lng: -20.4730327,
        name: 'Long Island',
        description: 'Place where trains are created',
        price: 200.45,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 1,
        address: '45 Redwood Trail',
        city: 'Big Sur',
        state: 'California',
        country: 'United States of America',
        lat: 36.2719,
        lng: -121.8081,
        name: 'Hidden Cabin in the Redwoods',
        description: 'A peaceful retreat surrounded by towering redwoods, perfect for a quiet getaway.',
        price: 145.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '88 Pine St',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States of America',
        lat: 45.5122,
        lng: -122.6587,
        name: 'Rooftop Loft Overlooking the River',
        description: 'Cozy rooftop loft with a beautiful view of the Willamette River, ideal for a quick city stay.',
        price: 95.75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 1,
        address: '29 Prairie Road',
        city: 'Santa Fe',
        state: 'New Mexico',
        country: 'United States of America',
        lat: 35.6870,
        lng: -105.9378,
        name: 'Desert Adobe Casita',
        description: 'Authentic adobe-style casita nestled in the desert, great for stargazing and relaxation.',
        price: 110.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '9 Lakeside Way',
        city: 'Asheville',
        state: 'North Carolina',
        country: 'United States of America',
        lat: 35.5951,
        lng: -82.5515,
        name: 'Secluded Lakeside Cabin',
        description: 'A charming lakefront cabin offering a rustic stay with easy access to hiking trails.',
        price: 130.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 1,
        address: '102 Neon Blvd',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States of America',
        lat: 36.1699,
        lng: -115.1398,
        name: 'The Quiet Side of Vegas',
        description: 'A hidden gem away from the strip, offering a peaceful night’s stay with city views.',
        price: 89.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: '777 Boardwalk',
        city: 'Atlantic City',
        state: 'New Jersey',
        country: 'United States of America',
        lat: 39.3643,
        lng: -74.4229,
        name: 'Beachfront Bungalow',
        description: 'A simple but cozy beachfront spot, perfect for a last-minute escape to the shore.',
        price: 120.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2] }
    }, null);
  }
};


//OLDERRRRRRRRRRRRRRRRR
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     return queryInterface.bulkInsert('Spots', [
//       {
//         ownerId: 1, // Ensure this matches a seeded user ID
//         address: '123 Disney Lane',
//         city: 'San Francisco',
//         state: 'California',
//         country: 'United States of America',
//         lat: 37.7645358,
//         lng: -122.4730327,
//         name: 'App Academy',
//         description: 'Place where web developers are created',
//         price: 123.45,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         ownerId: 2,
//         address: '12 choram',
//         city: 'San jersey',
//         state: 'NY',
//         country: 'United States of America',
//         lat: 50.7645358,
//         lng: -20.4730327,
//         name: 'Long Island',
//         description: 'Place where trains are created',
//         price: 200.45,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ], {validate: true});
//   },

//   async down (queryInterface, Sequelize) {
//     options.tableName = "Spots";
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete(options, {
//       ownerId: { [Op.in]: [1, 2] }

//     }, {});
//   }
// };
