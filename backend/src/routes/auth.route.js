// routes/auth.js
import express from "express"
const router = express.Router();

// In-memory user store (for example only — use DB in production)
const users = [];

// Signup (Register)
router.get('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    user => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // In real app, generate JWT or session
  res.json({ message: 'Login successful' });
});

// Logout
router.post('/logout', (req, res) => {
  // In real app, destroy session or invalidate JWT
  res.json({ message: 'Logout successful' });
});

router.get('/test', (req, res) => {
    res.send('Auth route is working');
  });
export default router;
