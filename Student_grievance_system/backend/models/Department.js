const mongoose = require('mongoose');
const DepartmentSchema = new mongoose.Schema({
name: { type: String, required: true, unique: true },
email: { type: String },
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Department', DepartmentSchema);