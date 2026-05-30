const Team = require('../models/Team')
const Issue = require('../models/Issue')

const getAllTeam = async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: 1 })
    // attach assigned/completed counts
    const membersWithStats = await Promise.all(members.map(async (m) => {
      const assigned = await Issue.countDocuments({
        assignee: m.name,
        status: { $ne: 'Completed' }
      })
      const completed = await Issue.countDocuments({ assignee: m.name, status: 'Completed' })
      return { ...m.toObject(), assigned, completed }
    }))
    res.status(200).json({ success: true, data: membersWithStats })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const addMember = async (req, res) => {
  try {
    const { name } = req.body
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    const member = await Team.create({ ...req.body, initials })
    res.status(201).json({ success: true, data: member })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

const deleteMember = async (req, res) => {
  try {
    const member = await Team.findByIdAndDelete(req.params.id)
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' })
    res.status(200).json({ success: true, message: 'Member removed' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllTeam, addMember, deleteMember }
