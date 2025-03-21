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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}, '-password');
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.findById(id, '-password');
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) {
        res.status(400).json({ message: 'Todos los campos son obligatorios' });
        return;
    }
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'El usuario ya está registrado' });
            return;
        }
        const newUser = new User_1.default({ nombre, email, password, rol });
        yield newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    }
    catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(id, { nombre, email, rol }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    }
    catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield User_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.deleteUser = deleteUser;
