"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const files_1 = require("./middlewares/files");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const express_handlebars_1 = require("express-handlebars");
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set('view engine', 'handlebars');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.get('/', (req, res) => {
    const files = fs_1.default.readdirSync(path_1.default.join(__dirname, '../uploads'));
    if (files.length === 0) {
        res.render('no-files', { layout: false });
    }
    else {
        res.render('gallery', { files, layout: false });
    }
});
app.get('/upload', (req, res) => {
    res.render('upload', { layout: false });
});
app.post('/upload', files_1.fileupload.single('imagen'), (req, res) => {
    if (!req.file) {
        res.status(400).send('Archivo inválido. Solo se permiten imágenes JPG y PNG.');
        return;
    }
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
