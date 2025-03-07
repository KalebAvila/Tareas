"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.perfil = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
exports.login = login;
const perfil = (req, res) => {
    if (req.user && 'email' in req.user && 'password' in req.user) {
        const { email, password } = req.user;
        res.json({ email, password });
    }
    else {
        res.status(400).json({ message: 'User not found' });
    }
};
exports.perfil = perfil;
