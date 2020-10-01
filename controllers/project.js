const createError = require("http-errors");
const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");
const { projectSchema } = require("../helpers/validation_schema");
const formatResponse = require("../helpers/format_response");
const { create } = require("../models/Project");

module.exports = {
  getProjects: async (req, res, next) => {
    try {
      const projectDocs = await Project.find({ author_id: req.payload.aud });

      let projects = [];

      projectDocs.forEach((project) => {
        const singleProject = formatResponse(project, "project");

        projects = [singleProject, ...projects];
      });

      res.json(projects);
    } catch (err) {
      next(err);
    }
  },
  getSingleProject: async (req, res, next) => {
    try {
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
        throw createError.NotFound(`Project doesn't exist`);

      const project = await Project.findById(req.params.id);

      if (!project) throw createError.NotFound(`Project doesn't exist`);

      if (project.author_id !== req.payload.aud) throw createError.Forbidden();

      const tasksDoc = await Task.find({
        project_id: project._id,
      });

      let tasks = [];

      tasksDoc.forEach((task) => {
        const singleTask = formatResponse(task, "task");

        tasks = [singleTask, ...tasks];
      });
      res.json({
        ...formatResponse(project, "project"),
        tasks,
      });
    } catch (err) {
      next(err);
    }
  },
  addProject: async (req, res, next) => {
    try {
      const result = await projectSchema.validateAsync(req.body);

      const user = await User.findById(req.payload.aud);

      const project = new Project({
        title: result.title,
        author_id: req.payload.aud,
        author_name: user.username,
      });

      if (project.author_id !== req.payload.aud) throw createError.Forbidden();

      const savedProject = await project.save();

      return res.json(formatResponse(savedProject, "project"));
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  },
  deleteProject: async (req, res, next) => {
    try {
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
        throw createError.NotFound(`Project doesn't exist`);

      const project = await Project.findOne({ _id: req.params.id });

      if (!project) throw createError.NotFound("Project doesn't exist");

      if (project.author_id !== req.payload.aud) throw createError.Forbidden();

      const tasks = await Task.find({ project_id: req.params.id });

      tasks.forEach(async (task) => {
        await task.remove();
      });

      await project.remove();

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};
