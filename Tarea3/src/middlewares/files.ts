import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
import path from 'path';

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes JPG y PNG'));
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const fileupload = multer({
    storage,
    fileFilter
});