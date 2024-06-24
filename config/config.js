const envConfig = require('dotenv').config();
const { parsed: { DB_USER_NAME, DB_PASSWORD, DB_NAME, HOST, DB_DIALECT } } = envConfig;

module.exports = {
  "development": {
    "username": DB_USER_NAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": HOST,
    "dialect": DB_DIALECT
  },
  "test": {
    "username": DB_USER_NAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": HOST,
    "dialect": DB_DIALECT
  },
  "production": {
    "username": DB_USER_NAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": HOST,
    "dialect": DB_DIALECT
  }
};
