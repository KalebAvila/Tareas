import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User'; 

export const register = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'El usuario ya está registrado' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            nombre,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email y contraseña son obligatorios' });
        return;
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Credenciales inválidas' });
            return;
        }

        // Comparar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Credenciales inválidas' });
            return;
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

