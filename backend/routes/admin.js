import express from 'express';
import { authenticateAdmin } from '../middleware/auth.js';
import User from '../models/User.js';
import Feedback from '../models/Feedback.js';
import Content from '../models/Content.js';

const router = express.Router();

// Admin Dashboard - Get stats
router.get('/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContent = await Content.countDocuments();
    const totalFeedback = await Feedback.countDocuments();
    const newFeedback = await Feedback.countDocuments({ status: 'new' });

    res.json({
      stats: {
        totalUsers,
        totalContent,
        totalFeedback,
        newFeedback
      },
      message: '✅ Admin access granted!'
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard', error: error.message });
  }
});

// Get all users
router.get('/users', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Delete user
router.delete('/users/:userId', authenticateAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: '✅ User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Get all feedback with detailed view
router.get('/feedback', authenticateAdmin, async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
  }
});

// Update feedback status
router.put('/feedback/:feedbackId/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Feedback.findByIdAndUpdate(
      req.params.feedbackId,
      { status },
      { new: true }
    );

    res.json({ message: '✅ Feedback status updated!', feedback: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
});

export default router;
