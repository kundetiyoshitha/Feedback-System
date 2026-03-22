import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

export const feedbackService = {
  // Submit new feedback
  async submit(data) {
    const res = await api.post('/feedback', data);
    return res.data;
  },

  // Get all feedback
  async getAll() {
    const res = await api.get('/feedback');
    return res.data;
  },

  // Get analytics
  async getAnalytics() {
    const res = await api.get('/feedback/analytics');
    return res.data;
  },

  // ✏️ Update feedback — requires email for ownership verification
  async update(id, { email, category, rating, message }) {
    const res = await api.put(`/feedback/${id}`, { email, category, rating, message });
    return res.data;
  },

  // 🗑️ Delete feedback — requires email for ownership verification
  async delete(id, email) {
    const res = await api.delete(`/feedback/${id}`, {
      data: { email }   // axios sends body via `data` for DELETE
    });
    return res.data;
  }
};