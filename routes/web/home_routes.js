let route = require('express').Router()
let controller = require('../../controllers/home_controller')


route.get('/',controller.index)
route.get('/set_current_chat/:id',controller.setCurrentChat)
route.get('/logout',controller.logout)

module.exports = route