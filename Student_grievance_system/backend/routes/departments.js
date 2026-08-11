const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Grievance = require('../models/Grievance')
const { protect, departmentOnly } = require('../middleware/authmiddleware')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

router.get('/', protect, departmentOnly, async (req, res) => {
  try {
    const grievances = await Grievance.find({
      'departmentTasks.department': req.user._id,
    })
      .populate('student')
      .populate('departmentTasks.department')

    res.json(grievances)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

router.post('/:id/resolve', protect, departmentOnly, upload.single('proof'), async (req, res) => {
  try {
    const { notes } = req.body
    const grievance = await Grievance.findById(req.params.id)
      .populate('student')
      .populate('departmentTasks.department')

    if (!grievance) return res.status(404).json({ msg: 'Grievance not found' })

    const deptTask = grievance.departmentTasks.find(
      (t) =>
        t.department &&
        (t.department._id?.toString() === req.user._id.toString() ||
          t.department.toString() === req.user._id.toString())
    )

    if (!deptTask)
      return res.status(403).json({ msg: 'Not assigned to this grievance' })

    deptTask.status = 'completed'
    deptTask.resolvedAt = new Date()
    deptTask.proof = req.file ? `/uploads/${req.file.filename}` : null
    deptTask.notes = notes || ''

    const allCompleted = grievance.departmentTasks.every((t) => t.status === 'completed')
    if (allCompleted) grievance.status = 'completed'

    await grievance.save()


    res.json({ msg: 'Marked completed successfully', grievance })
  } catch (err) {
    console.error('Resolve error:', err)
    res.status(500).json({ msg: 'Server error while completing grievance' })
  }
})

module.exports = router
