const Issue = require('../models/Issue')

// GET all issues (with optional filters)
const getAllIssues = async (req, res) => {
  try {
    const { status, priority, search } = req.query
    const filter = {}
    if (status && status !== 'All Statuses') filter.status = status
    if (priority && priority !== 'All Priorities') filter.priority = priority
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }
    const issues = await Issue.find(filter).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: issues.length, data: issues })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET single issue
const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    res.status(200).json({ success: true, data: issue })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// CREATE issue
const createIssue = async (req, res) => {
  try {
    const issue = await Issue.create(req.body)
    res.status(201).json({ success: true, data: issue })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ success: false, message: msgs.join(', ') })
    }
    res.status(500).json({ success: false, message: err.message })
  }
}

// UPDATE issue
const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    })
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    res.status(200).json({ success: true, data: issue })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// DELETE issue
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    res.status(200).json({ success: true, message: 'Issue deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// ADD comment
const addComment = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    issue.comments.push(req.body)
    await issue.save()
    res.status(201).json({ success: true, data: issue })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// DELETE comment
const deleteComment = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ success: false, message: 'Issue not found' })
    issue.comments = issue.comments.filter(c => c._id.toString() !== req.params.commentId)
    await issue.save()
    res.status(200).json({ success: true, data: issue })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// STATS for dashboard
const getStats = async (req, res) => {
  try {
    const total = await Issue.countDocuments()
    const open = await Issue.countDocuments({ status: 'Open' })
    const inProgress = await Issue.countDocuments({ status: 'In Progress' })
    const completed = await Issue.countDocuments({ status: 'Completed' })
    const recent = await Issue.find().sort({ createdAt: -1 }).limit(4)
    res.status(200).json({ success: true, data: { total, open, inProgress, completed, recent } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllIssues, getIssueById, createIssue, updateIssue, deleteIssue, addComment, deleteComment, getStats }
