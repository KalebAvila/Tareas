const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://newsapi.org/v2/sources';

const getSources = async (req, res) => {
    const params = {
        apiKey: API_KEY
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las fuentes', error: error.message });
    }
};

module.exports = {
    getSources,
};