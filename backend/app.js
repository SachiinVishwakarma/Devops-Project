const express = require('express');
const cors = require('cors');
const pool = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

// create table
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT
  );
`);

app.get('/', (req, res) => {
    res.send("API Running 🚀");
});

app.listen(5000, () => console.log("Backend running on 5000"));