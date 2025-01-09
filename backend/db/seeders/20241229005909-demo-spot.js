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
        city: 'San jersey',
        state: 'NY',
        country: 'United States of America',
        lat: 50.7645358,
        lng: -20.4730327,
        name: 'Long Island',
        description: 'Place where trains are created',
        price: 200.45,
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
