//set flash message to locals  so send to front end part and show

module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success':req.flash("success"),
        'error':req.flash("error")
    }
    next();
}