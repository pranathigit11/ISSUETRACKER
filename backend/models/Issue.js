const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    default: "Open"
  }
});

module.exports = mongoose.model("Issue", issueSchema);