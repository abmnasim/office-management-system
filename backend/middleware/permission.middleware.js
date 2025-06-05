import { getUserById } from "../models/user.model.js";

const hasPermission = (permission) => {
    return (req, res, next) => {
        const user = getUserById(req.user._id);
        if (!user || !user.permissions.includes(permission)) {
            return res.status(403).json({ message: 'Permission denied' });
        }
        next();
    }
}

export default hasPermission;