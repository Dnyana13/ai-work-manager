const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    status: {
      type: String,
      default: "todo"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);