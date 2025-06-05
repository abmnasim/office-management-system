# Project Routes

_/routes/project.routes.js_

```javascript
import express from "express";
import {
  createProject,
  deleteProject,
  fetchOwnProjects,
  fetchProjectById,
  fetchProjects,
  updateProject,
} from "../controllers/project.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(auth);

router.get("/", fetchProjects);
router.get("/own", fetchOwnProjects);
router.get("/:id", fetchProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
```
