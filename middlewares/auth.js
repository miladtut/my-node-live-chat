function handel(req,res,next){
    if(req.session.user){
       return next()
    }else{
        res.redirect('/auth/login')
    }
    
}

module.exports = handel