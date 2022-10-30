let route = require('express').Router()
let controller = require('../../controllers/auth_controller')
let registerValidator = require('../../validations/register_validation')
let loginValidator = require('../../validations/login_validation')



route.get('/login',controller.loginPage)
route.post('/login',loginValidator.validate(),controller.login)

route.get('/register',controller.registerPage)
route.post('/register',registerValidator.validate(),controller.register)



module.exports = route