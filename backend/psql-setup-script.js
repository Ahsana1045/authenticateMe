// const { sequelize } = require('./db/models');

// sequelize.showAllSchemas({ logging: false }).then(async (data) => {
//   if (process.env.NODE_ENV === 'production' && !data.includes(process.env.SCHEMA)) {
//     await sequelize.createSchema(process.env.SCHEMA);
//   }
// });



// // //ORIGINAL??????????
const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});
