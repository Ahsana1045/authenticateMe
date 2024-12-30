'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static associate(models) {
      // define association here


      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        as: 'spot', // Alias for association
      });

       // Review belongs to User
      Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user', // Alias for association
      });
      Review.hasMany(models.ReviewImages, {
        foreignKey: 'reviewId',
        as: 'ReviewImages',
      });



    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        min: 10
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      validate: {
        min: 1,
        max: 5
      },
    },
    imageUrl: {  // The column for the image URL
      type: DataTypes.STRING,
      allowNull: true,  // This is optional (not required to add an image)
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
