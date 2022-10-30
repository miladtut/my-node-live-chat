let routes = require('express').Router()

let auth_routes = require('./web/auth_routes')
let home_routes = require('./web/home_routes')
let friend_routes = require('./web/friend_routes')
let chat_routes = require('./web/chat_routes')

let guest = require('../middlewares/redirectifauthintecated')
let auth = require('../middlewares/auth')

routes.use('/auth',guest,auth_routes)
routes.use('/',auth,home_routes)
routes.use('/friends',auth,friend_routes)
routes.use('/chat',auth,chat_routes)




module.exports = routes