const { Pool } = require('pg');

module.exports = new Pool({
  connectionString: process.env.PROD_DATABASE_URL
})