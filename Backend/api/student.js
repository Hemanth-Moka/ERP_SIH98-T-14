const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// ================== ADD NEW STUDENT ==================
router.post('/add', async (req, res) => {
  const { name, rollNo, email, course, year, password } = req.body;

  if (!name || !rollNo || !email || !course || !year || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO student (name, roll_no, email, course, year, password, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, rollNo, email, course, year, hashedPassword, "STUDENT"]
    );

    res.status(201).json({
      message: 'Student added successfully',
      student: result.rows[0],
    });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ================== GET ALL STUDENTS ==================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, roll_no, email, course, year, role FROM student ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
