import express from 'express';
import Volunteer from '../models/Volunteer.js';
import Gallery from '../models/Gallery.js';
import Blog from '../models/Blog.js';
import Event from '../models/Event.js';
import Message from '../models/Message.js';

const router = express.Router();

// Volunteers
router.post('/volunteers/apply', async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ message: 'Volunteer application submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// Contact
router.post('/contact', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// Gallery
router.get('/gallery', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    const images = await Gallery.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery.' });
  }
});

router.post('/gallery', async (req, res) => {
  try {
    const image = new Gallery(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add image.' });
  }
});

// Blogs
router.get('/blogs', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    const blogs = await Blog.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

router.get('/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog.' });
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add blog.' });
  }
});

// Events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

router.post('/events/:id/join', async (req, res) => {
  try {
    res.json({ message: 'Successfully joined event' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join event.' });
  }
});

// Stats
router.get('/stats', (req, res) => {
  res.json({ livesImpacted: 15000, states: 12, volunteers: 500, projects: 50 });
});

export default router;
