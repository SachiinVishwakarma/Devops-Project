const express = require('express');
const cors = require('cors');
const pool = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send("API Running ......");
});

const startServer = async () => {
  let retries = 10;

  while (retries) {
    try {
      await pool.query('SELECT 1');
      console.log("Database connected ");

      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT,
          email TEXT
        );
      `);

      break;
    } catch (err) {
      console.log("Waiting for DB... ");
      retries--;
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  app.listen(5000, '0.0.0.0', () => {
    console.log("Backend running on 5000 ..");
  });
};

startServer();