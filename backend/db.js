// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'db',
//     database: 'postgres',
//     password: '1234',
//     port: 5432,
// });

// module.exports = pool;

require('dotenv').config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
});