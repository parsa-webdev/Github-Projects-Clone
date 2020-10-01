const express = require("express");
const router = express();

const { addTask, editTask, deleteTask } = require("../controllers/task");
const { verifyAccessToken } = require("../helpers/jwt_helpers");

router.post("/project/:id/task/", verifyAccessToken, addTask);
router.put("/task/:id", verifyAccessToken, editTask);
router.delete("/task/:id", verifyAccessToken, deleteTask);

module.exports = router;
