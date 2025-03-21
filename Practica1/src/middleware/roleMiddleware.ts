import { Request, Response, NextFunction } from 'express';

interface CustomUser {
    id: string;
    email: string;
    rol: string;
}

interface CustomRequest extends Request {
    user?: CustomUser;
}

const roleMiddleware = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user || (req.user as CustomUser).rol !== requiredRole) {
            res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
            return;
        }
        next();
    };
};

export default roleMiddleware;