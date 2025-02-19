const express = require('express');
const router = express.Router();

const sourcesController = require('../controllers/sources');
const headlinesController = require('../controllers/headlines');
const newsController = require('../controllers/news');

router.get('/sources', sourcesController.getSources);
router.get('/headlines', headlinesController.getTopHeadlines);
router.get('/news', newsController.getNews);

module.exports = router;