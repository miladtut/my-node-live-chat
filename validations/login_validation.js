let check = require('express-validator').check


function validate(){
    return [
        check('email').not().isEmpty().withMessage('email field is required').isEmail().withMessage('invalid email format'),
        check('password').not().isEmpty().withMessage('password field is required')
    ];
}


module.exports = {
    validate
}