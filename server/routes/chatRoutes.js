const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middlewares/auth');

// All chat routes are protected
router.use(auth);

// Chat routes
router.get('/', chatController.getChats);
router.get('/:id', chatController.getChat);
router.post('/', chatController.createChat);
router.post('/message', chatController.sendMessage);
router.delete('/:id', chatController.deleteChat);

module.exports = router; 