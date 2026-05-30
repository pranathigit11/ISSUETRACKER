const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  role: { type: String, default: '' },
  email: { type: String, default: '' },
  initials: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Team', teamSchema)
