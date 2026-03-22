const FeedbackModel = require('../models/feedbackModel');
const { analyzeSentiment } = require('../utils/sentimentAnalyzer');

const FeedbackController = {
  async submitFeedback(req, res, next) {
    try {
      const { name, email, category, rating, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required.'
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email address.'
        });
      }

      const sentiment = analyzeSentiment(message);

      await FeedbackModel.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        category: category || null,
        rating: rating || 0,
        message: message.trim(),
        sentiment_label: sentiment.label,
        sentiment_score: sentiment.compound,
        positive_score: sentiment.positive,
        negative_score: sentiment.negative,
        neutral_score: sentiment.neutral
      });

      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully!',
        sentiment
      });
    } catch (err) {
      next(err);
    }
  },

  async getAllFeedback(req, res, next) {
    try {
      const feedbacks = await FeedbackModel.getAll();
      res.json({ success: true, data: feedbacks });
    } catch (err) {
      next(err);
    }
  },

  // ✏️ UPDATE — only allowed if email matches
  async updateFeedback(req, res, next) {
    try {
      const { id } = req.params;
      const { email, category, rating, message } = req.body;

      if (!email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Email and message are required to update feedback.'
        });
      }

      // Fetch existing feedback
      const existing = await FeedbackModel.getById(id);
      if (!existing) {
        return res.status(404).json({ success: false, error: 'Feedback not found.' });
      }

      // Ownership check
      if (existing.email.toLowerCase() !== email.trim().toLowerCase()) {
        return res.status(403).json({
          success: false,
          error: 'You are not authorized to update this feedback.'
        });
      }

      // Re-analyze sentiment for updated message
      const sentiment = analyzeSentiment(message);

      await FeedbackModel.update(id, {
        category: category || existing.category,
        rating: rating || existing.rating,
        message: message.trim(),
        sentiment_label: sentiment.label,
        sentiment_score: sentiment.compound,
        positive_score: sentiment.positive,
        negative_score: sentiment.negative,
        neutral_score: sentiment.neutral
      });

      res.json({
        success: true,
        message: 'Feedback updated successfully!',
        sentiment
      });
    } catch (err) {
      next(err);
    }
  },

  // 🗑️ DELETE — only allowed if email matches
  async deleteFeedback(req, res, next) {
    try {
      const { id } = req.params;
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required to delete feedback.'
        });
      }

      // Fetch existing feedback
      const existing = await FeedbackModel.getById(id);
      if (!existing) {
        return res.status(404).json({ success: false, error: 'Feedback not found.' });
      }

      // Ownership check
      if (existing.email.toLowerCase() !== email.trim().toLowerCase()) {
        return res.status(403).json({
          success: false,
          error: 'You are not authorized to delete this feedback. Only the original submitter can delete it.'
        });
      }

      await FeedbackModel.delete(id);
      res.json({ success: true, message: 'Feedback deleted successfully.' });
    } catch (err) {
      next(err);
    }
  },

  async getAnalytics(req, res, next) {
    try {
      const analytics = await FeedbackModel.getAnalytics();
      res.json({ success: true, data: analytics });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = FeedbackController;