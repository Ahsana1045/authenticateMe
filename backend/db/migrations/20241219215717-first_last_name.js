'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'firstName', {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
        defaultValue: "NA"
      });
      await queryInterface.addColumn('Users', 'lastName', {
        allowNull: true,
        type: Sequelize.STRING,
        unique: false,
        defaultValue: "NA"});
},

  async down (queryInterface, Sequelize) {


      await queryInterface.removeColumn('Users', 'firstName');
      await queryInterface.removeColumn('Users', 'lastName');
  }
}
