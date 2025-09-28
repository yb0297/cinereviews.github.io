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

// Get all comments for a movie
app.get('/api/comments/movie/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const result = await pool.query(`
      SELECT c.*, p.full_name as user_name, p.avatar_url as user_avatar
      FROM comments c
      LEFT JOIN profiles p ON c.user_id = p.id
      WHERE c.movie_id = $1
      ORDER BY c.created_at DESC
    `, [parseInt(movieId)]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Get all comments by a user for a specific movie
app.get('/api/comments/movie/:movieId/user/:userId', async (req, res) => {
  try {
    const { movieId, userId } = req.params;
    const result = await pool.query(`
      SELECT c.*, p.full_name as user_name, p.avatar_url as user_avatar
      FROM comments c
      LEFT JOIN profiles p ON c.user_id = p.id
      WHERE c.movie_id = $1 AND c.user_id = $2
      ORDER BY c.created_at DESC
    `, [parseInt(movieId), userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ error: 'Failed to fetch user comments' });
  }
});

// Get all comments by a user
app.get('/api/comments/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(`
      SELECT c.*, p.full_name as user_name, p.avatar_url as user_avatar
      FROM comments c
      LEFT JOIN profiles p ON c.user_id = p.id
      WHERE c.user_id = $1
      ORDER BY c.created_at DESC
    `, [userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ error: 'Failed to fetch user comments' });
  }
});

// Create a new comment
app.post('/api/comments', async (req, res) => {
  try {
    const { movieId, movieTitle, content, userId, userName } = req.body;
    
    // First, ensure user profile exists
    await pool.query(`
      INSERT INTO profiles (id, full_name, username) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING
    `, [userId, userName, userName.toLowerCase().replace(/\s+/g, '_')]);

    // Insert new comment (allow multiple comments per user per movie)
    const result = await pool.query(`
      INSERT INTO comments (user_id, movie_id, movie_title, content)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [userId, movieId, movieTitle, content]);
    
    const comment = { ...result.rows[0], user_name: userName };
    res.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// Update a comment
app.put('/api/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content, userId } = req.body;
    
    const result = await pool.query(`
      UPDATE comments SET
        content = $1,
        updated_at = NOW()
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `, [content, commentId, userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Delete a comment
app.delete('/api/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;
    
    const result = await pool.query(
      'DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *',
      [commentId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

app.listen(port, 'localhost', () => {
  console.log(`Comment API server running on port ${port}`);
});