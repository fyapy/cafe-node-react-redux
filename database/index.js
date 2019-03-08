const Sequelize = require("sequelize");
const config = require("../config/config");
const Op = Sequelize.Op;

module.exports = new Sequelize(
  config.dbName,
  config.dbUsername,
  config.dbPass,
  {
    dialect: "mysql",
    logging: false,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
  }
);
