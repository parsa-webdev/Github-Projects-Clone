const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("project", ProjectSchema);
