"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newPost = new Post_1.default({
            titulo,
            contenido,
            autor: req.user.id,
        });
        yield newPost.save();
        res.status(201).json({ message: 'Publicación creada exitosamente', post: newPost });
    }
    catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find().populate('autor', 'nombre email');
        res.status(200).json(posts);
    }
    catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getPosts = getPosts;
