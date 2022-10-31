require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const sales = require('./models/sales');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
} = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 20000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

      const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
const { User, Ownership, UserAuth0, Sales, Review } = sequelize.models;

User.belongsToMany(Ownership, {through: 'UserOwnerships'});
UserAuth0.belongsToMany(Ownership, {through: 'UserAuth0Ownerships'});
Ownership.hasOne(User, {through: 'UserOwnerships'});
Ownership.hasOne(UserAuth0, {through: 'UserAuth0Ownerships'});
Ownership.hasOne(UserAuth0, { through: 'UserOwnerships' });
Ownership.belongsToMany(Review, { through: "Owner_Review" });
Review.belongsToMany(Ownership, { through: "Owner_Review" });

Sales.belongsToMany(Ownership, {through: 'OwnershipSale'});
Ownership.hasOne(Sales, {through: 'OwnershipSale'});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op
};