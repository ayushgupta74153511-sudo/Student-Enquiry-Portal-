const mongoose = require('mongoose');

const DepartmentTaskSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  status: { type: String, enum: ['pending','in_progress','resolved','completed'], default: 'pending' },
  assignedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date },
  proof: { type: String },
  notes: { type: String }
});

const GrievanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attachments: [{ type: String }], 
  status: { type: String, enum: ['open','in_progress','forwarded','resolved','rejected','completed'], default: 'open' },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  priorityDueDate: { type: Date }, 
  departmentTasks: [DepartmentTaskSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

GrievanceSchema.pre('save', function(next){
  if (this.isNew || this.isModified('priority')) {
    if (this.priority === 'high' && !this.priorityDueDate) {
      const due = new Date();
      due.setDate(due.getDate() + 2); 
      this.priorityDueDate = due;
    } else if (this.priority !== 'high') {
      this.priorityDueDate = undefined;
    }
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Grievance', GrievanceSchema);
