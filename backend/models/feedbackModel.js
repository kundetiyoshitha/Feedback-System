const { pool } = require('../config/db');

const FeedbackModel = {
  async create(data) {
    const sql = `
      INSERT INTO feedback 
        (name, email, category, rating, message, sentiment_label, sentiment_score, positive_score, negative_score, neutral_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
      data.name, data.email, data.category, data.rating, data.message,
      data.sentiment_label, data.sentiment_score,
      data.positive_score, data.negative_score, data.neutral_score
    ]);
    return result;
  },

  async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM feedback ORDER BY created_at DESC'
    );
    return rows;
  },

  // 🔍 Get single feedback by ID
  async getById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM feedback WHERE id = ?', [id]
    );
    return rows[0] || null;
  },

  // ✏️ Update feedback
  async update(id, data) {
    const sql = `
      UPDATE feedback SET
        category = ?,
        rating = ?,
        message = ?,
        sentiment_label = ?,
        sentiment_score = ?,
        positive_score = ?,
        negative_score = ?,
        neutral_score = ?
      WHERE id = ?
    `;
    const [result] = await pool.execute(sql, [
      data.category, data.rating, data.message,
      data.sentiment_label, data.sentiment_score,
      data.positive_score, data.negative_score, data.neutral_score,
      id
    ]);
    return result;
  },

  async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM feedback WHERE id = ?', [id]
    );
    return result;
  },

  async getAnalytics() {
    const [rows] = await pool.execute(`
      SELECT
        COUNT(*) AS total,
        AVG(rating) AS avg_rating,
        SUM(sentiment_label = 'Positive') AS positive_count,
        SUM(sentiment_label = 'Negative') AS negative_count,
        SUM(sentiment_label = 'Neutral')  AS neutral_count
      FROM feedback
    `);
    return rows[0];
  }
};

module.exports = FeedbackModel;