import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { readData, writeData } from "../utils/file.manager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECTS_FILE = path.join(__dirname, "../data/projects.json");

const getAllProjects = () => {
    return readData(PROJECTS_FILE);
}

const storeProject = (project) => {
    writeData(PROJECTS_FILE, project);
}

const getProjectById = (_id) => {
    const projects = getAllProjects();
    return projects.find(project => project._id === _id);
}

const removeProjectById = (_id) => {
    const projects = getAllProjects();
    const updatedProjects = projects.filter(project => project._id !== _id);
    writeData(PROJECTS_FILE, updatedProjects);
}

export { getAllProjects, getProjectById, removeProjectById, storeProject };

