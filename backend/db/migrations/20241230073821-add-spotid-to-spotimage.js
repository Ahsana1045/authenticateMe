'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('SpotImages');
    if (!columns.hasOwnProperty('spotId')) {
      await queryInterface.addColumn('SpotImages', 'spotId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Spots',
          key: 'id',
        },
        onDelete: 'CASCADE',
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('SpotImages', 'spotId');
  }
};
