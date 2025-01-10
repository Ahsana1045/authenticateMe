'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of the existing table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.FLOAT,

        // type: Sequelize.DECIMAL(11, 8),
        allowNull: false
      },
      lng: {
        type: Sequelize.FLOAT,

        // type: Sequelize.DECIMAL(11, 8),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      avgRating: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      previewImage: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: false,
        defalutValue: null
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },

  // async down (queryInterface, Sequelize) {

  //   await queryInterface.dropTable('Spots');
  // }
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  }
};
