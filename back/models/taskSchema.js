const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    userId : {type: String, required: true},
    taskName: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", taskSchema);
