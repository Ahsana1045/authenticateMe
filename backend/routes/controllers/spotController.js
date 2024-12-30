const { Spot } = require('../../db/models'); // Make sure you're importing your Spot model

const getSpots = async (req, res) => {
  try {
    const {
      page = 1,
      size = 20,
      minLat,
      maxLat,
      minLng,
      maxLng,
      minPrice,
      maxPrice,
    } = req.query;

    // Validate and parse the page and size query params
    const parsedPage = Math.max(1, Math.min(page, 10)); // Ensure it's between 1 and 10
    const parsedSize = Math.max(1, Math.min(size, 20)); // Ensure it's between 1 and 20

    // Build the query filters based on the optional parameters
    const filter = {};

    if (minLat) filter.lat = { ...filter.lat, [Op.gte]: minLat };
    if (maxLat) filter.lat = { ...filter.lat, [Op.lte]: maxLat };
    if (minLng) filter.lng = { ...filter.lng, [Op.gte]: minLng };
    if (maxLng) filter.lng = { ...filter.lng, [Op.lte]: maxLng };
    if (minPrice) filter.price = { ...filter.price, [Op.gte]: minPrice };
    if (maxPrice) filter.price = { ...filter.price, [Op.lte]: maxPrice };

    // Fetch the filtered spots
    const { rows: spots, count } = await Spot.findAndCountAll({
      where: filter,
      limit: parsedSize,
      offset: (parsedPage - 1) * parsedSize,
    });

    // Calculate the average rating for each spot if necessary (assuming you have a review system)
    const spotsWithRatings = await Promise.all(
      spots.map(async (spot) => {
        const avgRating = await spot.getReviews().then((reviews) => {
          if (reviews.length > 0) {
            const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
            return sum / reviews.length;
          }
          return 0;
        });

        return {
          ...spot.toJSON(),
          avgRating, // Include average rating in the response
          previewImage: spot.previewImage, // Include preview image URL
        };
      })
    );

    // Calculate total pages
    const totalPages = Math.ceil(count / parsedSize);

    res.json({
      Spots: spotsWithRatings,
      page: parsedPage,
      size: parsedSize,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getSpots };


















// // controllers/spotController.js

// const { Spot, Sequelize } = require('../../db/models'); // Assuming you have Spot model and Sequelize is set up

// const getSpots = async (req, res) => {
//   try {
//     // Extract query parameters for filtering and pagination
//     const {
//       page = 1,
//       size = 20,
//       minLat,
//       maxLat,
//       minLng,
//       maxLng,
//       minPrice,
//       maxPrice
//     } = req.query;

//     // Convert page and size to integers and handle defaults/limits
//     const currentPage = Math.max(1, Math.min(parseInt(page), 10)); // Ensure page is between 1 and 10
//     const pageSize = Math.max(1, Math.min(parseInt(size), 20)); // Ensure size is between 1 and 20
//     const offset = (currentPage - 1) * pageSize;
//     const limit = pageSize;

//     // Build the where conditions for filtering
//     let where = {};

//     if (minLat) where.lat = { [Sequelize.Op.gte]: minLat }; // Minimum latitude filter
//     if (maxLat) where.lat = { [Sequelize.Op.lte]: maxLat }; // Maximum latitude filter
//     if (minLng) where.lng = { [Sequelize.Op.gte]: minLng }; // Minimum longitude filter
//     if (maxLng) where.lng = { [Sequelize.Op.lte]: maxLng }; // Maximum longitude filter
//     if (minPrice) where.price = { [Sequelize.Op.gte]: minPrice }; // Minimum price filter
//     if (maxPrice) where.price = { [Sequelize.Op.lte]: maxPrice }; // Maximum price filter

//     // Query spots from the database with filters and pagination
//     const spots = await Spot.findAll({
//       where: where,
//       offset: offset,
//       limit: limit,
//       order: [['createdAt', 'DESC']], // Optional: Sort by creation date
//     });

//     // Get total number of spots to calculate total pages
//     const totalSpots = await Spot.count({ where: where });
//     const totalPages = Math.ceil(totalSpots / limit);

//     // Respond with spots and pagination data
//     res.json({
//       Spots: spots,
//       page: currentPage,
//       size: pageSize,
//       totalPages: totalPages,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// module.exports = { getSpots };
