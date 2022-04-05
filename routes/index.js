let passport = require('passport');
const { Router } = require("express");
const router = Router();
const checkForAuth = require('../passport/local-auth')
const { newuserEmail } = require('../services/sendEmail')
const upload = require('../http/middlewares/multer')

controllersProductos = require('../http/controllers.productos')
controllersCarritos = require('../http/controllers.carritos')
controllersAvatar = require('../http/controllers.avatar')
controllersRegiter = require('../http/controllers.register')
controllersViews = require('../http/controllers.views')
controllersChat = require('../http/controllers.chats')

function serverRouter(app){
    
    app.use('/api', router);
    
    // CRUD PRODUCTS
    router.post('/productos', controllersProductos.write)
    router.get('/productos', controllersProductos.read)
    router.put('/updateproductos', controllersProductos.update)
    router.delete('/deleteproductos', controllersProductos.deleted)
    router.post('/producto/:id', controllersProductos.deleteProduct)
    router.get('/producto/:id', controllersProductos.readById)

    // CARRITO LOGIC
    router.post('/buy', checkForAuth, controllersCarritos.write)
    router.post('/carritos', controllersCarritos.write)
    router.get('/carritos', controllersCarritos.read)
    router.delete('/carritos/:id', controllersCarritos.deleted)

    // VIEWS
    router.get('/index', controllersRegiter.comesFromSignup,controllersViews.index)
    router.get('/avatares', controllersAvatar.avatar)
    router.get('/chat', controllersViews.chat)
    router.get('/loadproduct', controllersRegiter.checkAuth, controllersViews.loadProduct);
    router.get('/carrito', controllersRegiter.checkAuth, controllersViews.carrito)
    router.get('/index', controllersViews.index)
    router.get('/signup', controllersViews.signup)
    router.get('/login', controllersViews.login)
    router.get('/logout', controllersRegiter.logOut)
    router.get('/:params', controllersViews.noViews);

    // CHAT
    router.post('/messages', controllersChat.writeFromClient)

    // REGISTER
    router.post('/login', controllersRegiter.authLogin);
    router.post('/signup', upload.single('userpic'),  controllersRegiter.authSignup);

}

module.exports = serverRouter;