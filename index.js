import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './db.js';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import artistRoutes from './artist.routes.js';
import songRoutes from './song.routes.js';
import playlistRoutes from './playlist.routes.js';
// Import Spotify routes using ES modules syntax
import spotifyRoutes from './spotify.routes.js';



const app = express();
dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

// DB
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
});

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running on Render!" });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
// Make sure this line is present and correct
app.use('/api/spotify', spotifyRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});
