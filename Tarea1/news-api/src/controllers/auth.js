const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;

const authenticate = (req, res, next) => {
    if (!API_KEY) {
        return res.status(401).json({ error: 'API Key no proporcionada' });
    }
    next();
};

module.exports = {
    authenticate,
};