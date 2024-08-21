const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const protectedRoutes = require('./routes/protectedRoute');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const imageRoute = require('./routes/imageRoute');
const favoriteCharacterRoutes = require('./routes/favoriteCharacterRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Update this to your frontend's URL in production
  credentials: true,
}));

// API routes
app.use('/api/users', userRoutes);
app.use('/api', protectedRoutes);
app.use('/api/bookmarks', bookmarkRoutes); 
app.use('/api/image', imageRoute);
app.use('/api/favorites', favoriteCharacterRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
