import express from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('friends')
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile/:id', authenticate, async (req, res) => {
  try {
    const { name, bio, interests, vibe, goals, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio, interests, vibe, goals, preferences },
      { new: true }
    ).select('-password');

    res.json({ message: '✅ Profile updated!', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Send friend request
router.post('/friend-request/:targetId', authenticate, async (req, res) => {
  try {
    const { targetId } = req.params;

    await User.findByIdAndUpdate(
      targetId,
      {
        $push: {
          friendRequests: { from: req.userId, status: 'pending' }
        }
      }
    );

    res.json({ message: '✅ Friend request sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending request', error: error.message });
  }
});

// Accept friend request
router.post('/friend-request/:requesterId/accept', authenticate, async (req, res) => {
  try {
    const { requesterId } = req.params;

    // Add to friends list
    await User.findByIdAndUpdate(req.userId, {
      $push: { friends: requesterId },
      $pull: { friendRequests: { from: requesterId } }
    });

    await User.findByIdAndUpdate(requesterId, {
      $push: { friends: req.userId }
    });

    res.json({ message: '✅ Friend request accepted!' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting request', error: error.message });
  }
});

export default router;
