let passport = require('passport');

let checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('login');
}

let logOut = (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            setTimeout(()=>{
                res.redirect('/')
            }, 2000)
        }else res.send({status: 'Logout error', body: err})
    })
}

let authLogin = passport.authenticate('login',{
    successRedirect: "/api/loadproduct",
    failureRedirect: "login"
})

let authSignup = passport.authenticate('signup',{
    successRedirect: "index",
    failureRedirect: "login"
})

let comesFromSignup = (req, res, next) => {
    if(req.header('referer') == `http://localhost:${process.env.PORT}/api/signup`){
        if(req.user) newuserEmail(req.user)
        next()
    } else{
        next()
    }
}

module.exports = {
    checkAuth,
    comesFromSignup,
    logOut,
    authLogin,
    authSignup
}