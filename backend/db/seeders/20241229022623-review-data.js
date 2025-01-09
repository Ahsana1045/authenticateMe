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
        userId: 1,
        spotId: 1,
        review: 'What a great movie!',
        stars: 5,
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
