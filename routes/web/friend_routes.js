let route = require('express').Router()

let controller = require('../../controllers/friend_controller')


route.get('/send-request/:id',controller.sendFriendRequest)
route.get('/cancel-request/:id',controller.cancelSentFriendRequest)
route.get('/accept-request/:id',controller.acceptFriendRequest)
route.get('/reject-request/:id',controller.rejectFriendRequest)
route.get('/unfriend/:id',controller.removeFriend)


module.exports = route