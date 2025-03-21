"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MongoClient = require('mongodb').MongoClient;
const connectDB = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.log('Failed to connect to the database');
                reject(err);
                return;
            }
            const db = client.db();
            console.log('Connected to MongoDB successfully');
            resolve();
        });
    });
};
exports.connectDB = connectDB;
