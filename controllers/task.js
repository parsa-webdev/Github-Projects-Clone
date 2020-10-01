const createError = require("http-errors");
const Project = require("../models/Project");
const Task = require("../models/Task");
const { taskSchema, editTaskSchema } = require("../helpers/validation_schema");
const formatResponse = require("../helpers/format_response");

module.exports = {
  addTask: async (req, res, next) => {
    try {
      const result = await taskSchema.validateAsync(req.body);

      const statuses = ["todo", "in-progress", "done"];

      if (!statuses.includes(result.status))
        throw createError.BadRequest("Status is invalid");

      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
        throw createError.NotFound(`Project doesn't exist`);

      const project = await Project.findOne({ _id: req.params.id });

      if (!project) throw createError.NotFound(`Project doesn't exist`);

      if (project.author_id !== req.payload.aud) throw createError.Forbidden();

      const task = new Task({
        note: result.note,
        status: result.status,
        project_id: project._id,
      });

      const savedTask = await task.save();

      return res.json(formatResponse(savedTask, "task"));
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  },
  editTask: async (req, res, next) => {
    try {
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
        throw createError.NotFound(`Task doesn't exist`);

      const task = await Task.findOne({ _id: req.params.id });

      if (!task) throw createError.NotFound("Task doesn't exist");

      const project = await Project.findOne({ _id: task.project_id });

      if (project.author_id !== req.payload.aud) throw createError.Forbidden();

      const result = await editTaskSchema.validateAsync(req.body);

      const statuses = ["todo", "in-progress", "done"];

      if (!statuses.includes(result.status))
        throw createError.BadRequest("Status is invalid");

      task.status = result.status;

      const editedTask = await task.save();

      return res.json(formatResponse(editedTask, "task"));
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  },
  deleteTask: async (req, res, next) => {
    try {
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
        throw createError.NotFound(`Task doesn't exist`);

      const task = await Task.findOne({ _id: req.params.id });

      if (!task) throw createError.NotFound("Task doesn't exist");

      const project = await Project.findOne({ _id: task.project_id });

      if (project.author_id !== req.payload.aud) throw createError.Forbidden();

      await task.remove();

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};
