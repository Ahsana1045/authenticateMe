'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      // If you still want to associate SpotImage with Spot later, you can do so
      // SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }

  SpotImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false, // Make URL required
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Make preview required
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });

  return SpotImage;
};
