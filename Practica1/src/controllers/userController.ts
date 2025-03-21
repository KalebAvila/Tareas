import { Request, Response } from 'express';
import User from '../models/User'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({}, '-password'); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const user = await User.findById(id, '-password'); 
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, password, rol } = req.body;

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

        const newUser = new User({ nombre, email, password, rol });
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { nombre, email, rol },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};