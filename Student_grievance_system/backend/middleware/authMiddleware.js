const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function protect(req, res, next) {
  try {
    let token = req.headers.authorization

    if (!token || !token.startsWith('Bearer '))
      return res.status(401).json({ msg: 'Not authorized, no token' })

    token = token.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) return res.status(401).json({ msg: 'User not found' })
    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ msg: 'Token invalid or expired' })
  }
}

function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') return next()
  res.status(403).json({ msg: 'Admin access only' })
}

function departmentOnly(req, res, next) {
  if (req.user && req.user.role === 'department') return next()
  res.status(403).json({ msg: 'Department access only' })
}

module.exports = { protect, adminOnly, departmentOnly }
