'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      // Associate SpotImage with Spot (foreign key: spotId)
      SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId', as: 'spot' });
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
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Make spotId required
      references: {
        model: 'Spots',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });

  return SpotImage;
};
