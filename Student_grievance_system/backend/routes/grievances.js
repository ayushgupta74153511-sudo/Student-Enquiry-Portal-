const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authMiddleware, role } = require('../middleware/auth');
const Grievance = require('../models/Grievance');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

router.post('/', authMiddleware, role('student'), upload.array('attachment', 4), async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const attachments = (req.files || []).map(f => `/uploads/${f.filename}`);
    const g = new Grievance({
      title,
      description,
      priority: priority || 'medium',
      attachments,
      student: req.user._id,
      status: 'open'
    });
    await g.save();
    res.json(g);
  } catch (err) {
    console.error('Create grievance error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role === 'student') {
      const list = await Grievance.find({ student: req.user._id }).populate('departmentTasks.department', 'name email');
      return res.json(list);
    }
    if (req.user.role === 'department') {
      const list = await Grievance.find({ 'departmentTasks.department': req.user._id }).populate('student', 'name email');
      return res.json(list);
    }
    
    const list = await Grievance.find().populate('student', 'name email').populate('departmentTasks.department', 'name email');
    res.json(list);
  } catch (err) {
    console.error('Get grievances error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
