import dotenv from 'dotenv';

dotenv.config();

const MongoClient = require('mongodb').MongoClient;

export const connectDB = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGO_URI, {}, (err: any, client: { db: () => any; }) => {
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

export default connectDB;

