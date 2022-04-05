let carrito = (req, res) => {
    if (req.isAuthenticated()) { 
        res.render('carrito', {user_data: req.user[0]}) 
    } else
    res.render('carrito')
}

let index = (req, res) => {
    if (req.isAuthenticated()) { 
        res.render('index', {user_data: req.user[0]}) 
    } else
    res.render('index')
}

let signup = (req, res) => {res.render('signup')}

let loadProduct = (req, res) => {
    if (req.isAuthenticated()) { 
        res.render('loadproduct', {user_data: req.user[0]}) 
    } else
    res.render('loadproduct')
}

let login = (req, res) => {
    if (req.isAuthenticated()) { 
        res.render('loadproduct', {user_data: req.user[0]}) 
    } else
    res.render('login')
}

let noViews = (req, res) => {
    let object = {
        error: -2,
        descripcion: `ruta '/${req.params.params}' por metodo ${req.method} no implementada`
    }
    res.send(object)
}

let chat = (req, res) => {
    if (req.isAuthenticated()) { 
        res.render('newchat', {user_data: req.user[0]}) 
    } else
    res.render('newchat')
}

module.exports = {
    carrito,
    index,
    signup,
    loadProduct,
    noViews,
    login,
    chat
}