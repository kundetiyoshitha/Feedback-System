const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
  getAnalytics,
  deleteFeedback,
  updateFeedback
} = require('../controllers/feedbackController');

// GET  /api/feedback/analytics  — must be before /:id
router.get('/analytics', getAnalytics);

// GET  /api/feedback
router.get('/', getAllFeedback);

// POST /api/feedback
router.post('/', submitFeedback);

// PUT /api/feedback/:id  — update feedback (ownership verified via email)
router.put('/:id', updateFeedback);

// DELETE /api/feedback/:id  — delete feedback (ownership verified via email)
router.delete('/:id', deleteFeedback);

module.exports = router;