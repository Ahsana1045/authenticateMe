'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Spots', 'avgRating', {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: null
    });

    await queryInterface.addColumn('Spots', 'previewImage', {
      allowNull: true,
      type: Sequelize.STRING,
      unique: false,
      defalutValue: null
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Spots', 'avgRating');
    await queryInterface.removeColumn('Spots', 'previewImage');
  }
};
