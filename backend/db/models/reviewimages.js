'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImages extends Model {
    static associate(models) {
      // Define association here
      ReviewImages.belongsTo(models.Review, {
        foreignKey: 'reviewId',
        as: 'Review', // Alias for association
        onDelete: 'CASCADE', // Ensure cascading delete
      });
    }
  }

  ReviewImages.init(
    {
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true, // Validate the value is a URL
        },
      },
    },
    {
      sequelize,
      modelName: 'ReviewImages',
    }
  );

  return ReviewImages;
};


// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const ReviewImages = sequelize.define(
//     'ReviewImages',
//     {
//       reviewId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       url: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {}
//   );

//   ReviewImages.associate = function (models) {
//     ReviewImages.belongsTo(models.Review, {
//       foreignKey: 'reviewId',
//       onDelete: 'CASCADE',
//     });
//   };

//   return ReviewImages;
// };
