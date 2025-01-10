'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Spot belongs to User (ownerId)
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner',
      });

      // Spot has many Reviews
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        as: 'reviews',
      });

      // Spot has many SpotImages
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',  // Fixed the foreignKey here
        as: 'SpotImages',
        onDelete: 'CASCADE'
      });
    }
  }

  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      },
    },
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    avgRating: DataTypes.INTEGER,
    previewImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Spot',
  });

  return Spot;
};
