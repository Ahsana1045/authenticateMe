'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewImages = sequelize.define(
    'ReviewImages',
    {
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  ReviewImages.associate = function (models) {
    ReviewImages.belongsTo(models.Review, {
      foreignKey: 'reviewId',
      onDelete: 'CASCADE',
    });
  };

  return ReviewImages;
};
