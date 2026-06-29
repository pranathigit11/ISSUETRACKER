const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  authorRole: { type: String, default: '' },
  text: { type: String, required: true },
}, { timestamps: true })

const issueSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, default: '', trim: true },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed', 'Closed'],
    default: 'Open',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  },
  assignee: { type: String, default: '' },
  assigneeRole: { type: String, default: '' },
  reporter: { type: String, default: '' },
  reporterRole: { type: String, default: '' },
  dueDate: { type: String, default: '' },
  comments: [commentSchema],
}, { timestamps: true })

module.exports = mongoose.model('Issue', issueSchema)
