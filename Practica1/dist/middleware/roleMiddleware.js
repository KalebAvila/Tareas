"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.rol !== requiredRole) {
            res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
            return;
        }
        next();
    };
};
exports.default = roleMiddleware;
