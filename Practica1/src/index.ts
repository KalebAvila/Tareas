import app from './app';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos y luego iniciar el servidor
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });