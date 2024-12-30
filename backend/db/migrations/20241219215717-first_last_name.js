// const schema = process.env.SCHEMA || 'public';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.addColumn(
//       { tableName: 'Users', schema },
//       'firstName',
//       {
//         allowNull: false,
//         type: Sequelize.STRING,
//         unique: false,
//         defaultValue: "NA",
//       }
//     );

//     await queryInterface.addColumn(
//       { tableName: 'Users', schema },
//       'lastName',
//       {
//         allowNull: true,
//         type: Sequelize.STRING,
//         unique: false,
//         defaultValue: "NA", // Fixed spelling
//       }
//     );
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.removeColumn(
//       { tableName: 'Users', schema },
//       'firstName'
//     );
//     await queryInterface.removeColumn(
//       { tableName: 'Users', schema },
//       'lastName'
//     );
//   },
// };


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
