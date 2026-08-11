const express = require('express');
const router = express.Router();
const { authMiddleware, role } = require('../middleware/auth');
const Grievance = require('../models/Grievance');
const User = require('../models/User');
const sendMail = require('../utils/mailer');

router.post('/grievances/:id/forward', authMiddleware, role('admin'), async (req, res) => {
  try {
    const gid = req.params.id;
    const { departments } = req.body;
    if (!Array.isArray(departments) || departments.length === 0) {
      return res.status(400).json({ msg: 'Provide departments array' });
    }

    const g = await Grievance.findById(gid);
    if (!g) return res.status(404).json({ msg: 'Grievance not found' });

    departments.forEach(depId => {
      const exists = g.departmentTasks.some(t => t.department.toString() === depId.toString());
      if (!exists) {
        g.departmentTasks.push({ department: depId, status: 'pending', assignedAt: Date.now() });
      }
    });

    g.status = 'forwarded';
    await g.save();
    res.json(g);
  } catch (err) {
    console.error('Forward error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/grievances/:id', authMiddleware, role('admin'), async (req, res) => {
  try {
    const g = await Grievance.findById(req.params.id).populate('student');
    if (!g) return res.status(404).json({ msg: 'Not found' });

    Object.assign(g, req.body);
    await g.save();

    if (g.student?.email) {
      await sendMail(
        g.student.email,
        'Grievance Status Updated',
        `<h3>Your grievance titled "${g.title}" has been updated.</h3>
         <p><b>New Status:</b> ${g.status}</p>
         <p>Thank you for using the Grievance System.</p>`
      );
    }

    res.json(g);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/departments', authMiddleware, role('admin'), async (req, res) => {
  try {
    const deps = await User.find({ role: 'department' }).select('_id name email');
    res.json(deps);
  } catch (err) {
    console.error('List departments error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/analytics', authMiddleware, role('admin'), async (req, res) => {
  try {
    const grievances = await Grievance.find({ 'departmentTasks.0': { $exists: true } }).populate(
      'departmentTasks.department',
      'name email'
    );

    const perDept = {};
    const resolutionTimes = {};

    grievances.forEach((g) => {
      g.departmentTasks.forEach((t) => {
        const depId = t.department ? t.department._id.toString() : null;
        const depName = t.department ? t.department.name : 'unknown';
        if (!depId) return;

        perDept[depId] = perDept[depId] || { department: depName, count: 0 };
        perDept[depId].count++;

        if (t.status === 'completed' && t.resolvedAt) {
          const hours = (new Date(t.resolvedAt) - new Date(t.assignedAt)) / (1000 * 60 * 60);
          resolutionTimes[depId] = resolutionTimes[depId] || [];
          resolutionTimes[depId].push(hours);
        }
      });
    });

    const analytics = Object.keys(perDept).map((depId) => {
      const avg =
        (resolutionTimes[depId] || []).reduce((a, b) => a + b, 0) /
        ((resolutionTimes[depId] || []).length || 1);
      return {
        departmentId: depId,
        departmentName: perDept[depId].department,
        count: perDept[depId].count,
        avgResolutionHours: Math.round(avg * 100) / 100,
      };
    });

    res.json({ analytics });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/grievances/:id', authMiddleware, role('admin'), async (req, res) => {
  try {
    const g = await Grievance.findById(req.params.id);
    if (!g) return res.status(404).json({ msg: 'Grievance not found' });

    await g.deleteOne();
    res.json({ msg: 'Grievance deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ msg: 'Server error while deleting grievance' });
  }
});

module.exports = router;
