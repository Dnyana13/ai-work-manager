const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  status: {
    type: String,
    default: "todo"
  }

}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);