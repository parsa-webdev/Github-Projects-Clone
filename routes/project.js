const express = require("express");
const router = express();

const {
  addProject,
  deleteProject,
  getProjects,
  getSingleProject,
} = require("../controllers/project");
const { verifyAccessToken } = require("../helpers/jwt_helpers");

router.post("/project/", verifyAccessToken, addProject);
router.delete("/project/:id", verifyAccessToken, deleteProject);
router.get("/projects", verifyAccessToken, getProjects);
router.get("/project/:id", verifyAccessToken, getSingleProject);

module.exports = router;
