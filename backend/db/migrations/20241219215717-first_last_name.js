'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    /*await queryInterface.addColumn('Users', 'firstName', {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
        defaultValue: "NA"
      });*/
      await queryInterface.addColumn('Users', 'lastName', {
        allowNull: true,
        type: Sequelize.STRING,
        unique: false,
        defalutValue: "NA"});
},

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

      await queryInterface.removeColumn('Users', 'firstName');
      await queryInterface.removeColumn('Users', 'lastName');
  }
}
