const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const getTopHeadlines = async (req, res) => {
    const { country, category, sources, q } = req.query;
    const params = {
        apiKey: API_KEY,
    };

    if (country) {
        params.country = country;
    }
    if (category) {
        params.category = category;
    }
    if (sources) {
        params.sources = sources;
    }
    if (q) {
        params.q = q;
    }

    try {
        const response = await axios.get(BASE_URL, { params });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top headlines', error: error.message });
    }
};

module.exports = {
    getTopHeadlines,
};