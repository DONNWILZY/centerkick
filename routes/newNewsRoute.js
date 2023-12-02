const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsControlller'); // Update the path accordingly

router.post('/create/:userId', newsController.createNews);
router.put('/update/:id', newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);
router.get('/all', newsController.getAllNews);
router.get('/one/:id', newsController.getSingleNews);
router.get('/trending-news', newsController.getTrending);
router.get('/top-story', newsController.getTopStory);
router.get('/latest', newsController.getNewest);
router.get('/popular', newsController.getPopular);
router.get('/trending', newsController.getTrending);  

module.exports = router;
