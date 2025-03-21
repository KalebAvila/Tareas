import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPost extends Document {
    titulo: string;
    contenido: string;
    fecha: Date;
    autor: IUser['_id'];
}

const PostSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    autor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IPost>('Post', PostSchema);