const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

// *** this is the localhost connection string .... uncomment if you want to run locally
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);

// *** this is the deployed db connection string .... comment out if running locally
// const db = newSequelize(
//   "postgres://graceshopper_osu0_user:VAZzHbMStDNNjaGcn6DRthIBjLISu52r@dpg-cf0oalh4reb56qkpv6u0-a/graceshopper_osu0"
// );
module.exports = db;
