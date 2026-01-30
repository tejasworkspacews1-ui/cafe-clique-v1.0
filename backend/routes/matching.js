import express from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get nearby users with matching vibes
router.get('/find-friends', authenticate, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    
    // Find users with similar vibes
    const matches = await User.find({
      _id: { $ne: req.userId },
      vibe: currentUser.vibe,
      location: { $exists: true }
    }).select('-password').limit(10);

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error finding matches', error: error.message });
  }
});

// Get recommendations based on AI matching
router.get('/recommendations', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    // Simple matching algorithm - can be enhanced with ML
    const recommendations = await User.aggregate([
      { $match: { _id: { $ne: user._id } } },
      { $addFields: {
          commonInterests: {
            $size: {
              $setIntersection: ['$interests', user.interests]
            }
          }
        }
      },
      { $sort: { commonInterests: -1 } },
      { $limit: 20 }
    ]);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommendations', error: error.message });
  }
});

export default router;
