import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const login = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    const token = jwt.sign({ email, password }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
};

const perfil = (req: Request, res: Response) => {
    if (req.user && 'email' in req.user && 'password' in req.user) {
        const { email, password } = req.user;
        res.json({ email, password });
    } else {
        res.status(400).json({ message: 'User not found' });
    }
};

export { login, perfil };