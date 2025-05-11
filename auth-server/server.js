<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const auth = require('./middleware/auth');
const validateRegister = require('./middleware/validateRegister');
const validateLogin = require('./middleware/validateLogin');
require('dotenv').config();

=======
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, setupDatabase } = require('./db');
const auth = require('./middleware/auth');
const validate = require('./middleware/validate');

>>>>>>> 2966da3a22b1d6fa49111c7e1836f9a2456edb1c
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth_api',
});

<<<<<<< HEAD
// Register route
app.post('/api/register', validateRegister, async (req, res) => {
  const { email, password, firstName, lastName, image } = req.body;
=======
// Register endpoint
app.post('/api/register', validate.validateRegister, async (req, res) => {
    try {
        const { firstName, lastName, email, password, course, phone } = req.body;
>>>>>>> 2966da3a22b1d6fa49111c7e1836f9a2456edb1c

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (email, password, firstName, lastName, image) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, firstName, lastName, image]
    );

    const id = result[0].insertId;
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.json({ id, email, accessToken, refreshToken, firstName, lastName, image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

<<<<<<< HEAD
// Login route
app.post('/api/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
=======
// Login endpoint
app.post('/api/login', validate.validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
>>>>>>> 2966da3a22b1d6fa49111c7e1836f9a2456edb1c

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.json({
      id: user.id,
      email: user.email,
      accessToken,
      refreshToken,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Refresh token route
app.post('/api/refresh-token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    res.json({ accessToken });
  });
});

// Get current user
app.get('/api/me', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, email, firstName, lastName, image FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update profile
app.put('/api/profile', auth, async (req, res) => {
  const { firstName, lastName, image } = req.body;

  try {
    await db.query(
      'UPDATE users SET firstName = ?, lastName = ?, image = ? WHERE id = ?',
      [firstName, lastName, image, req.user.id]
    );
    res.json({ message: 'Profile updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
