import authRoutes from "./routes/auth.route.js"

// server.js
import express from "express"
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js API Server!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// Assuming you're using express
// import express from "express"
// const app = express();
// const port = 3000;

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Define the POST login route
// app.post('/api/auth/login', (req, res) => {
//   const { username, password } = req.body;

//   // TODO: Add your actual auth logic here
//   if (username === 'admin' && password === 'password') {
//     res.json({ message: 'Login successful!' });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
