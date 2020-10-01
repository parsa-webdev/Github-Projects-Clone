const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  project_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("task", TaskSchema);
