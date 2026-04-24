const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;

        const result = await pool.query(
            'INSERT INTO users(name, email) VALUES($1,$2) RETURNING *',
            [name, email]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM users WHERE id = $1', [id]);

        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;