'use strict';
require('dotenv').config();

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
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
      // {
      //   ownerId: 2,
      //   address: '12 choram',
      //   city: 'San jersey',
      //   state: 'NY',
      //   country: 'United States of America',
      //   lat: 50.7645358,
      //   lng: -20.4730327,
      //   name: 'Long Island',
      //   description: 'Place where trains are created',
      //   price: 200.45,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Spots', null, {});
  }
};
