import express from 'express';
import { config } from 'dotenv';
import { fileupload } from './middlewares/files';
import path from 'path';
import fs from 'fs';

config();

const app = express();
const port = process.env.PORT || 3000;

import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
    const files = fs.readdirSync(path.join(__dirname, '../uploads'));
    if (files.length === 0) {
        res.render('no-files', { layout: false });
    } else {
        res.render('gallery', { files, layout: false });
    }
});


app.get('/upload', (req, res) => {
    res.render('upload', { layout: false });
});

app.post('/upload', fileupload.single('imagen'), (req, res): void => {
    if (!req.file) {
        res.status(400).send('Archivo inválido. Solo se permiten imágenes JPG y PNG.');
        return;
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});