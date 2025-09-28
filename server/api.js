import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const port = 3001;

// Database connection
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

app.use(cors());
app.use(express.json());

// Get all reviews for a movie
app.get('/api/reviews/movie/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const result = await pool.query(`
      SELECT r.*, p.full_name as user_name, p.avatar_url as user_avatar
      FROM reviews r
      LEFT JOIN profiles p ON r.user_id = p.id
      WHERE r.movie_id = $1
      ORDER BY r.created_at DESC
    `, [parseInt(movieId)]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get user's review for a specific movie
app.get('/api/reviews/movie/:movieId/user/:userId', async (req, res) => {
  try {
    const { movieId, userId } = req.params;
    const result = await pool.query(`
      SELECT r.*, p.full_name as user_name, p.avatar_url as user_avatar
      FROM reviews r
      LEFT JOIN profiles p ON r.user_id = p.id
      WHERE r.movie_id = $1 AND r.user_id = $2
    `, [parseInt(movieId), userId]);
    
    res.json(result.rows[0] || null);
  } catch (error) {
    console.error('Error fetching user review:', error);
    res.status(500).json({ error: 'Failed to fetch user review' });
  }
});

// Get all reviews by a user
app.get('/api/reviews/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(`
      SELECT r.*, p.full_name as user_name, p.avatar_url as user_avatar
      FROM reviews r
      LEFT JOIN profiles p ON r.user_id = p.id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC
    `, [userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ error: 'Failed to fetch user reviews' });
  }
});

// Create a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { movieId, movieTitle, rating, title, content, pros, cons, recommendation, userId, userName } = req.body;
    
    // First, ensure user profile exists
    await pool.query(`
      INSERT INTO auth.users (id, email) VALUES ($1, $1) ON CONFLICT (id) DO NOTHING
    `, [userId]);
    
    await pool.query(`
      INSERT INTO profiles (id, full_name, username) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING
    `, [userId, userName, userName.toLowerCase().replace(/\s+/g, '_')]);

    // Insert or update review
    const result = await pool.query(`
      INSERT INTO reviews (user_id, movie_id, movie_title, rating, title, content, pros, cons, recommendation)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (user_id, movie_id) DO UPDATE SET
        rating = EXCLUDED.rating,
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        pros = EXCLUDED.pros,
        cons = EXCLUDED.cons,
        recommendation = EXCLUDED.recommendation,
        updated_at = NOW()
      RETURNING *
    `, [userId, movieId, movieTitle, rating, title, content, pros || [], cons || [], recommendation]);
    
    const review = { ...result.rows[0], user_name: userName };
    res.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a review
app.put('/api/reviews/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, title, content, pros, cons, recommendation, userId } = req.body;
    
    const result = await pool.query(`
      UPDATE reviews SET
        rating = $1,
        title = $2,
        content = $3,
        pros = $4,
        cons = $5,
        recommendation = $6,
        updated_at = NOW()
      WHERE id = $7 AND user_id = $8
      RETURNING *
    `, [rating, title, content, pros || [], cons || [], recommendation, reviewId, userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found or unauthorized' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review
app.delete('/api/reviews/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body;
    
    const result = await pool.query(
      'DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING *',
      [reviewId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found or unauthorized' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Review API server running on port ${port}`);
});