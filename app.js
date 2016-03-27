
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

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    /*
app.get('/auth/google/callback',
    function(req, res, next) {
      passport.authenticate('google',
        function(err, user, info) {
        if (err) { 
            return res.json(err);
        }
        if (user.error) {
            return res.json({ error: user.error });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.json(err);
            }
            res.redirect("/#/?uid="+user._id);
            return null;
        });
    })(req, res);
    });
*/
app.get('/auth/google/callback',
            passport.authenticate('google', {
                    failureRedirect : '/',
                    successRedirect : '/#/listaCerveja'
            }));

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
