const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

const getNews = async (req, res) => {
    const { query } = req.query.q;
    const params = {
        q: query,
        apiKey: API_KEY
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

module.exports = {
    getNews
};