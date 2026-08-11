require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Department = require('./models/Department');


async function seed(){
await connectDB(process.env.MONGO_URI);
await User.deleteMany({});
await Department.deleteMany({});
const salt = await bcrypt.genSalt(10);
const admin = new User({ name: 'Admin', email: 'admin@example.com', password: await bcrypt.hash('admin123', salt), role: 'admin' });
const student = new User({ name: 'Student', email: 'student@example.com', password: await bcrypt.hash('student123', salt), role: 'student' });
const dept = new User({ name: 'Electric Dept', email: 'dept@example.com', password: await bcrypt.hash('dept123', salt), role: 'officer' });
await admin.save(); await student.save(); await dept.save();
const d1 = new Department({ name: 'Electricity', email: 'dept@example.com' });
const d2 = new Department({ name: 'Plumbing', email: 'plumb@example.com' });
await d1.save(); await d2.save();
console.log('Seeding done.');
process.exit();
}
seed();