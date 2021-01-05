//since we are using env the next steps are required .. R.Diaz
require('dotenv').config();
// if the step above is forgotten the .env file cannot be read
// NOTE: we need to create a .env file on the root to include all our MSQL and API Keys
// and then add .env file to the .gitignore before committing to github or heroku
module.exports={
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PSWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
