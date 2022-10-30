function handel(req,res,next){
    if(req.session.user){
        res.redirect('/')
    }else{
        return next()
    }
    
}



module.exports = handel