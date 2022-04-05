const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan')
const serverRoutes = require('./routes/index.js');
const cors = require('cors');
const logger = require('./utils/logger');
const MongoStore = require('connect-mongo')
require('./passport/local-auth');

module.exports = () => {

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_DB = process.env.MONGO_DB_URI_SIMPLE;
const ATLASDB_SESSION_NAME = process.env.MONGO_SESSION;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

// Middlewares
app.use(cors('*'))
app.use(express.static(path.join(__dirname,"public")));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser('un secreto'));
app.use(session ({
    store: MongoStore.create({
        mongoUrl: `${MONGO_DB}${ATLASDB_SESSION_NAME}`,
        mongoOptions: advancedOptions
    }),
    secret: process.env.SECRET,
    resave: false, // para que no vuelva a guardar la session
    saveUninitialized: false,
    // store: sessionStore,
    cookie: {
        maxAge: 60 * 10 * 1000 // Equals 10 min. 
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.get('/', (req, res) => res.redirect('/api/index'))

app.get('/:params', (req, res) => {
        let object = {
            error: -2,
            descripcion: `Ruta '/${req.params.params}' por metodo ${req.method} no implementada`
            }
            logger.getLogger('outwarning').warn(`Try to access non existing route ${req.method} - ${req.url}`);
        res.send(object)
});
serverRoutes(app)
return app
}