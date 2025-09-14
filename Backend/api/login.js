const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // Check in student table first
    let result = await pool.query('SELECT * FROM student WHERE email=$1', [email]);
    let user = result.rows[0];

    // If not student, check admin table
    if (!user) {
      result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
      user = result.rows[0];
    }

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Determine redirect based on role
    const redirectTo = user.role === 'STUDENT' ? '/student-dashboard' : '/admin-dashboard';

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'ADMIN',
      },
      redirectTo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
