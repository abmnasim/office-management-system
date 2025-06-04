import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { readData, writeData } from "../utils/file.manager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const USERS_FILE = path.join(__dirname, "../data/users.json");

const getAllUsers = () => {
    return readData(USERS_FILE);
}

const storeUser = (user) => {
    writeData(USERS_FILE, user);
}

const getUserByEmail = (email) => {
    const users = getAllUsers();
    return users.find(user => user.email === email);
}

const getUserById = (_id) => {
    const users = getAllUsers();
    return users.find(user => user._id === _id);
}

export { getAllUsers, getUserByEmail, getUserById, storeUser };

