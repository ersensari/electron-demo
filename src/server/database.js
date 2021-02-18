const tedious = require("tedious");
const { Sequelize, DATE } = require("sequelize");

DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_ADDRESS,
    dialect: "mssql",
    dialectModule: tedious
  }
);

const connect = function() {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => resolve("Connection has been established successfully."))
      .catch(error =>
        reject({ msg: "Unable to connect to the database:", error })
      );
  });
};

export { connect, sequelize };
export default sequelize;
