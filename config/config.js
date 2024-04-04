const envConfig = require('dotenv').config();
const { parsed: { DB_PASSWORD } } = envConfig;

module.exports = {
  "development": {
    "username": "root",
    "password": DB_PASSWORD,
    "database": "todos_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": DB_PASSWORD,
    "database": "todos_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": DB_PASSWORD,
    "database": "todos_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
