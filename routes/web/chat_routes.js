let controller = require('../../controllers/chat_controller');
let route = require('express').Router();



route.post('/send-msg',controller.sendMsg)



module.exports = route