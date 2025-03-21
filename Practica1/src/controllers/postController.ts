import { Request, Response } from 'express';
import Post from '../models/Post';
import User from '../models/User';

export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { titulo, contenido } = req.body;

    if (!titulo || !contenido) {
        res.status(400).json({ message: 'El título y el contenido son obligatorios' });
        return;
    }

    try {
        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Usuario no autenticado' });
            return;
        }

        const newPost = new Post({
            titulo,
            contenido,
            autor: req.user.id,
        });

        await newPost.save();
        res.status(201).json({ message: 'Publicación creada exitosamente', post: newPost });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find().populate('autor', 'nombre email');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};