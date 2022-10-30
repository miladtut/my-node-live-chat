
let User = require('../models/user')


let validationResult = require('express-validator').validationResult

let bcrypt = require('bcrypt')

function loginPage(req,res){
    res.render('login',{validationErroes:req.flash('validationErroes'),success:req.flash('success')[0],errors:req.flash('errors')})
}

async function login(req,res){
    let result = validationResult(req)
    console.log(result.array())
    
    if(result.isEmpty()){
        let user = await User.findOne({email:req.body.email})
        if(user){
            let auth = bcrypt.compareSync(req.body.password,user.password)
            if(auth){
                user.is_online = true;
                await user.save()
                req.session.user = user
                console.log(user)
                res.redirect('/')
            }else{
                req.flash('errors','invalid email or password')
                res.redirect('/auth/login')
            }
        }else{
            req.flash('errors','invalid email or password')
            res.redirect('/auth/login')
        }
    }else{
        req.flash('validationErroes',result.array())
        res.redirect('/auth/login')
    }
   
}


function registerPage(req,res){
    res.render('register',{errors:req.flash('errors')})
}

async function register(req,res){
    let result = validationResult(req).array()
    console.log(req.body,result)
    let user = await User.findOne({email:req.body.email});
    if(user){
        req.flash('errors','email already token')
        res.redirect('/register')
    }else{
        await User.create({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,10)
        })
        req.flash('success','success registration please login')
        res.redirect('/login')
    }
    
}



module.exports = {
    loginPage,
    login,
    registerPage,
    register
}