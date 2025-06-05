import express from 'express';
import { createProject, deleteProject, fetchOwnProjects, fetchProjectById, fetchProjects, updateProject } from '../controllers/project.controller.js';
import auth from '../middleware/auth.middleware.js';
import hasPermission from '../middleware/permission.middleware.js';

const router = express.Router();

router.use(auth);

router.get("/", hasPermission("read:projects"), fetchProjects);
router.get("/own", hasPermission("read:projects"), fetchOwnProjects);
router.get("/:_id", hasPermission("read:projects"), fetchProjectById);
router.post("/", hasPermission("create:projects"), createProject);
router.put("/:_id", hasPermission("update:projects"), updateProject);
router.delete("/:_id", hasPermission("delete:projects"), deleteProject);

export default router;