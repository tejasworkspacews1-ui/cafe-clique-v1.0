import express from 'express';
import Feedback from '../models/Feedback.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Submit feedback
router.post('/submit', async (req, res) => {
  try {
    const { userId, type, subject, message, email, rating } = req.body;

    const feedback = new Feedback({
      userId,
      type,
      subject,
      message,
      email,
      rating
    });

    await feedback.save();
    res.status(201).json({ message: '✅ Thank you! Your feedback has been received.', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
});

// Get all feedbacks (admin only)
router.get('/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
  }
});

// Respond to feedback (admin only)
router.put('/:feedbackId/respond', async (req, res) => {
  try {
    const { adminResponse } = req.body;

    const updated = await Feedback.findByIdAndUpdate(
      req.params.feedbackId,
      { adminResponse, status: 'responded' },
      { new: true }
    );

    res.json({ message: '✅ Response added!', feedback: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error responding to feedback', error: error.message });
  }
});

export default router;
