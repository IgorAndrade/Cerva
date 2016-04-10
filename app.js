
/**
 * Module dependencies
 */

var express = require('express');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var expressValidator = require("express-validator");
var passport = require('passport');
var morgan = require('morgan'),
  http = require('http'),
  conf = require('./env/'+process.env.NODE_ENV +'/config'),
  auth = require('./env/'+process.env.NODE_ENV +'/auth'),
  allconf = require('./env/all/config'),
  load = require('express-load'),
  cors = require('cors'),
  path = require('path');
  var cookieParser = require('cookie-parser');
var app = module.exports = express();
app.conf=conf;
app.conf.all=allconf;
app.auth=auth;
/**
 * Configuration
 */

// all environments
app.set('port', conf.port || 3000);
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized: true, 
                  secret: 'uwotm8' }));
app.use(expressValidator());

app.use(cors());

// parse application/json
app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse multipart/form-data
app.use(multer());

app.use(passport.initialize());
app.use(passport.session());

app.isLoggedInAjax = function isLoggedInAjax(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
       res.status(401).json({ "error": "Usuário não logado!" });
    }
};

// route middleware to ensure user is logged in
app.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/#/login');
};

var env = process.env.NODE_ENV || 'dev';

// development only
if (env === 'dev') {
  app.use(errorHandler());
}

// production only
if (env === 'producao') {
  // TODO
}


/**
 * Routes
 */

load("models").
then("passports").
then("services").into(app);

/**
 * DB
 */
var mongoose = require('mongoose');

global.db = mongoose.connect(conf.db.url);

//DB  fim
//busca User Logado
app.get('/profile', app.isLoggedInAjax, function(req, res) {
    res.status(200).json(req.user);
});

//Ajax Login
app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { 
            return res.status(500).json(err);
        }
        if (user.error) {
            return res.status(400).json({ error: user.error });
        }else if (user==false)
          return res.status(400).json({ error: "Login inválido" });
        
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(user);
        });
        
      //  res.status(200).json(req.user);
  })(req, res, next);
});

//Logado via redesocial
app.post('/logadoRedeSocial', function(req, res, next) {
  passport.authenticate('logado-redesocial', function(err, user, info) {
    if (err) { 
            return res.status(500).json(err);
        }
        if (user.error) {
            return res.status(400).json({ error: user.error });
        }else if (user==false)
          return res.status(400).json({ error: "Login inválido" });
        
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(user);
        });
        
       // res.status(200).json(req.user);
  })(req, res, next);
});

//Cadastro
app.post('/cadastrar', function(req, res, next) {
  passport.authenticate('cadastro', function(err, user, info) {
    if (err) { 
            return res.status(500).json(err);
        }
        if (user.error) {
            return res.status(400).json({ error: user.error });
        }else if (user==false)
          return res.status(400).json({ error: "Cadastro inválido" });
        
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(user);
        });
        
       // res.status(200).json(req.user);
  })(req, res, next);
});

//google
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
            passport.authenticate('google', {
                    failureRedirect : '/',
                    successRedirect : '/#/profile'
            }));
//facebook
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                    failureRedirect : '/',
                    successRedirect : '/#/profile'
            }));
 // route for logging out
app.get('/logout', function(req, res) {
        req.logout();
        res.status(200).json("Deslogado")
});

// serve index and view partials
app.get('/', function(req, res){
  res.render('index');
});

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
  res.render('index');
});


/**
 * Start Server
 */

http.createServer(app).listen(conf.port, conf.ip, function () {
  console.log('Express server listening on port ' + app.get('port'));
});
