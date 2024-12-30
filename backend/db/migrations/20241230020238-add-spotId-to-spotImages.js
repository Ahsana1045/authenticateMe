'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('SpotImages', 'spotId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
          model: 'Spots',
          key: 'id',
      },
      onDelete: 'CASCADE', // Optionally, cascade on deletion
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('SpotImages', 'spotId');
    }
};
