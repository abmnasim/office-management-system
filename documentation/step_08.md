# Project Controller

_/controllers/project.controller.js_

```javascript
import { v4 as uuid } from "uuid";
import {
  getAllProjects,
  getProjectById,
  removeProjectById,
  storeProject,
} from "../models/project.model.js";

const fetchProjects = async (req, res) => {
  const projects = await getAllProjects();
  return res.status(200).json({
    message: "Projects fetched successfully",
    projects: projects,
  });
};

const fetchOwnProjects = async (req, res) => {
  const { _id } = req.user;
  const projects = await getAllProjects();
  const ownProjects = projects.filter((project) => project.managerId === _id);

  return res.status(200).json({
    message: "Own projects fetched successfully",
    projects: ownProjects,
  });
};

const fetchProjectById = async (req, res) => {
  const { _id } = req.params;
  const project = await getProjectById(_id);
  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  return res.status(200).json({
    message: "Project fetched successfully",
    project: project,
  });
};

const createProject = async (req, res) => {
  const { name, description, platform, packageName, managerId } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Project name is required",
    });
  }

  if (!packageName) {
    return res.status(400).json({
      message: "Package name is required",
    });
  }

  if (!managerId) {
    return res.status(400).json({
      message: "Project Manager is required",
    });
  }

  const newProject = {
    _id: uuid(),
    name,
    description,
    platform: platform || "android",
    packageName,
    managerId,
    createdBy: req.user._id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await storeProject(newProject);

  return res.status(201).json({
    message: "Project created successfully",
    project: newProject,
  });
};

const updateProject = async (req, res) => {
  const { _id } = req.params;

  const project = await getProjectById(_id);
  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const updatedData = {
    ...project,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  storeProject(updatedData);

  return res.status(200).json({
    message: "Project updated successfully",
    project: updatedData,
  });
};

const deleteProject = async (req, res) => {
  const { _id } = req.params;

  const project = await getProjectById(_id);
  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  removeProjectById(_id);

  return res.status(200).json({
    message: "Project deleted successfully",
  });
};

export {
  createProject,
  deleteProject,
  fetchOwnProjects,
  fetchProjectById,
  fetchProjects,
  updateProject,
};
```
