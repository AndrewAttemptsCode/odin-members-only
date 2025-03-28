const { Pool } = require('pg');

module.exports = new Pool({
  connectionString: process.env.PROD_DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})