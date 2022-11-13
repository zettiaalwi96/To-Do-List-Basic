const express = require("express");
const task = express.Router();
const TaskSchema = require('../models/taskSchema')

task.get("/", (req, res) => {
  TaskSchema.find({}, (err, tasks) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(tasks);
    }
  });
});

task.post("/", (req, res) => {
  TaskSchema.create(req.body, (err, createdTask) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.send(createdTask);
    }
  });
});

task.delete("/:id", (req, res) => {
  TaskSchema.findByIdAndDelete(req.params.id, (err, deletedTask) => {
    if (err) {
      res.status(400).json({ err: err.message });
    } else {
      res.status(200).json(deletedTask);
    }
  });
});

task.put("/:id", (req, res) => {
  TaskSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedTask) => {
      if (err) {
        res.status(400).json({ err: err.message });
      } else {
        res.status(200).json(updatedTask);
      }
    }
  );
});

module.exports = task;
