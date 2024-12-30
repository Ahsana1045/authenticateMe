'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      unique: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
