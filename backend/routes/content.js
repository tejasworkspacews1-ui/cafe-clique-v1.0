import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Content from '../models/Content.js';

const router = express.Router();

// Create content
router.post('/create', authenticate, async (req, res) => {
  try {
    const { type, title, description, content, tags, visibility } = req.body;

    const newContent = new Content({
      userId: req.userId,
      type,
      title,
      description,
      content,
      tags,
      visibility
    });

    await newContent.save();
    res.status(201).json({ message: '✅ Content created!', content: newContent });
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error: error.message });
  }
});

// Get feed
router.get('/feed', authenticate, async (req, res) => {
  try {
    const contents = await Content.find({ visibility: 'public' })
      .populate('userId', 'name profilePic')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feed', error: error.message });
  }
});

// Like content
router.post('/:contentId/like', authenticate, async (req, res) => {
  try {
    await Content.findByIdAndUpdate(
      req.params.contentId,
      { $addToSet: { likes: req.userId } },
      { new: true }
    );

    res.json({ message: '✅ Liked!' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking content', error: error.message });
  }
});

// Comment on content
router.post('/:contentId/comment', authenticate, async (req, res) => {
  try {
    const { text } = req.body;

    const updated = await Content.findByIdAndUpdate(
      req.params.contentId,
      { $push: { comments: { userId: req.userId, text } } },
      { new: true }
    );

    res.json({ message: '✅ Comment added!', content: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

export default router;
